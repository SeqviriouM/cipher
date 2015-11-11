import BitArray from 'node-bitarray';
import bigInt from 'big-integer';

const MULL_CONST = Math.pow(2, 16) + 1;
const ADD_CONST = Math.pow(2, 16);

// const key = BitArray.fromBinary('1111010110').toJSON().reverse();


// const permutation = (input, scheme) => input.map((item, index, arr) => arr[scheme[index] - 1]);

const shift = (input, shiftValue) => input.map((item, index, arr) => arr[(index + (shiftValue % arr.length) + arr.length) % arr.length]);

// const size = (input, scheme) => scheme.map((item) => input[item - 1]);

// const key = Array.from(new Array(128), () => Math.floor(2 * Math.random()));
const key = '00000000000000010000000000000010000000000000001100000000000001000000000000000101000000000000011000000000000001110000000000001000'.split('').map(el => +el);

const arrDivide = (input, blockSize) => Array.from(new Array(input.length / blockSize), (item, index) => input.slice(index * blockSize, index * blockSize + blockSize));

const binExtend = (input, inputSize) => input.unshift(...Array.from(new Array(inputSize - input.length), () => 0));

const mod = (value, base) => (((value % base) + base) % base);

const mullByModule = (val1, val2) => {
  const val1Number = BitArray.toNumber(val1.slice().reverse()) || ADD_CONST;
  const val2Number = BitArray.toNumber(val2.slice().reverse()) || ADD_CONST;

  let result = ((bigInt(val1Number).multiply(bigInt(val2Number))).mod(bigInt(MULL_CONST)));

  if (result.toJSNumber() === ADD_CONST) {
    result = bigInt(0);
  }

  const resultBin = BitArray.factory(result.toJSNumber()).toJSON();

  binExtend(resultBin, 16);

  return resultBin;
};


const addByModule = (val1, val2) => {
  const val1Number = BitArray.toNumber(val1.slice().reverse());
  const val2Number = BitArray.toNumber(val2.slice().reverse());

  const result = ((bigInt(val1Number).add(val2Number)).mod(bigInt(ADD_CONST)));
  const resultBin = BitArray.factory(result.toJSNumber()).toJSON();

  binExtend(resultBin, 16);

  return resultBin;
};


const xgcd = (a, b) => {
  if (a === 0) {
    return [b, 0, 1];
  }

  const [ g, y, x ] = xgcd(mod(b, a), a);

  return [g, x - Math.floor(b / a) * y, y];
 };

const modInv = (val, size = 16) => {
  const valNumber = val.length ? BitArray.toNumber(val.slice().reverse()) : val;
  const [ g, x, y ] = xgcd(valNumber, MULL_CONST);
  if (g !== 1) {
    throw 'modular inverse does not exist';
  }

  const result = mod(x, MULL_CONST);
  const resultBin = BitArray.factory(result).toJSON();
  binExtend(resultBin, size);

  return val.length ? resultBin : result;
};

const addInv = (val, size = 16) => {
  const result = ADD_CONST - BitArray.toNumber(val.reverse());
  const resultBin = BitArray.factory(result).toJSON();
  binExtend(resultBin, size);

  return val.length ? resultBin : result;
};

function generateKeys(decode = false) {
  let roundKeys = [];
  const roundKeysArr = [];

  for (let roundIndex = 0; roundIndex < 7; roundIndex++) {
    const roundKey = shift(key, (25 * roundIndex));
    roundKeysArr.push(...roundKey);
  }

  for (let roundIndex = 0; roundIndex < 9; roundIndex++) {
    const roundPart = roundKeysArr.splice(0, 96);
    roundKeys[roundIndex] = arrDivide(roundPart, 16);
  }

  if (!decode) {
    // return roundKeys;
  } else {
    const decodeRoundKeys = [];

    decodeRoundKeys[0] = [
      modInv(roundKeys[8][0]),
      addInv(roundKeys[8][1]),
      addInv(roundKeys[8][2]),
      modInv(roundKeys[8][3]),
      roundKeys[7][4],
      roundKeys[7][5],
    ];

    for (let i = 1; i < 8; i++) {
      decodeRoundKeys[i] = [
        modInv(roundKeys[8 - i][0]),
        addInv(roundKeys[8 - i][2]),
        addInv(roundKeys[8 - i][1]),
        modInv(roundKeys[8 - i][3]),
        roundKeys[7 - i][4],
        roundKeys[7 - i][5],
      ];
    }

    decodeRoundKeys[8] = [
      modInv(roundKeys[0][0]),
      addInv(roundKeys[0][1]),
      addInv(roundKeys[0][2]),
      modInv(roundKeys[0][3]),
    ];

    roundKeys = decodeRoundKeys;
  }

  return roundKeys;
}


function round(block, roundKeys, roundIndex) {
  const roundBlocks = arrDivide(block, 16);

  console.log(`----- Round ${roundIndex} -----`);

  roundBlocks[0] = mullByModule(roundBlocks[0], roundKeys[roundIndex][0]);
  roundBlocks[3] = mullByModule(roundBlocks[3], roundKeys[roundIndex][3]);

  roundBlocks[1] = addByModule(roundBlocks[1], roundKeys[roundIndex][1]);
  roundBlocks[2] = addByModule(roundBlocks[2], roundKeys[roundIndex][2]);

  let tmpRoundBlock1 = BitArray.xor(roundBlocks[0], roundBlocks[2], BitArray.factory(0, 16));
  let tmpRoundBlock2 = BitArray.xor(roundBlocks[1], roundBlocks[3], BitArray.factory(0, 16));

  tmpRoundBlock1 = mullByModule(tmpRoundBlock1, roundKeys[roundIndex][4]);
  tmpRoundBlock2 = addByModule(tmpRoundBlock1, tmpRoundBlock2);

  tmpRoundBlock2 = mullByModule(tmpRoundBlock2, roundKeys[roundIndex][5]);
  tmpRoundBlock1 = addByModule(tmpRoundBlock1, tmpRoundBlock2);

  roundBlocks[0] = BitArray.xor(roundBlocks[0], tmpRoundBlock2, BitArray.factory(0, 16));
  roundBlocks[1] = BitArray.xor(roundBlocks[1], tmpRoundBlock1, BitArray.factory(0, 16));
  roundBlocks[2] = BitArray.xor(roundBlocks[2], tmpRoundBlock2, BitArray.factory(0, 16));
  roundBlocks[3] = BitArray.xor(roundBlocks[3], tmpRoundBlock1, BitArray.factory(0, 16));

  [roundBlocks[1], roundBlocks[2]] = [roundBlocks[2], roundBlocks[1]];

  return [].concat(...roundBlocks);
}

function finalRound(block, roundKeys, roundIndex) {
  const roundBlocks = arrDivide(block, 16);

  console.log(`----- Final Round -----`);

  [roundBlocks[1], roundBlocks[2]] = [roundBlocks[2], roundBlocks[1]];

  roundBlocks[0] = mullByModule(roundBlocks[0], roundKeys[roundIndex][0]);
  roundBlocks[3] = mullByModule(roundBlocks[3], roundKeys[roundIndex][3]);
  roundBlocks[1] = addByModule(roundBlocks[1], roundKeys[roundIndex][1]);
  roundBlocks[2] = addByModule(roundBlocks[2], roundKeys[roundIndex][2]);

  return [].concat(...roundBlocks);
}

export function crypt(text) {
  const roundKeys = generateKeys();
  // let block = Array.from(new Array(64), () => Math.floor(2 * Math.random()));
  let block = text;

  for (let i = 0; i < 8; i++) {
    block = round(block, roundKeys, i);

    console.log(`Block ${i}: ${block}`);
  }

  const cryptedText = finalRound(block, roundKeys, 8);

  return cryptedText;
}

export function decrypt(text) {
  const roundKeys = generateKeys(true);
  // let block = Array.from(new Array(64), () => Math.floor(2 * Math.random()));
  let block = text;

  for (let i = 0; i < 8; i++) {
    block = round(block, roundKeys, i);

    console.log(`Block ${i}: ${block}`);
  }

  const decryptedText = finalRound(block, roundKeys, 8);

  return decryptedText;
}

// const text = Array.from(new Array(64), () => Math.floor(2 * Math.random()));

const text = '0000000000000000000000000000000100000000000000100000000000000011'.split('').map(el => +el);

console.log('Default text: ' + text);

const encryptedText = crypt(text);
const decryptedText = decrypt(encryptedText);

console.log('Encrypted text: ' + encryptedText);
console.log('Decrypted text: ' + decryptedText);
console.log('Default text: ' + text);
console.log(text === decryptedText);

// console.log(modInv(0x363f));

// 0x363f -- 47551
