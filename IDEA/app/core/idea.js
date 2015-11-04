import BitArray from 'node-bitarray';

const MULL_CONST = Math.pow(2, 16) + 1;
const ADD_CONST = Math.pow(2, 16);

// const key = BitArray.fromBinary('1111010110').toJSON().reverse();


// const permutation = (input, scheme) => input.map((item, index, arr) => arr[scheme[index] - 1]);

const shift = (input, shiftValue) => input.map((item, index, arr) => arr[(index + shiftValue) % arr.length]);

// const size = (input, scheme) => scheme.map((item) => input[item - 1]);

const key = Array.from(new Array(128), () => Math.floor(2 * Math.random()));

const arrDivide = (input, blockSize) => Array.from(new Array(input.length / blockSize), (item, index) => input.slice(index * blockSize, index * blockSize + blockSize));

const binExtend = (input, inputSize) => input.unshift(...Array.from(new Array(inputSize - input.length), () => 0));

// const generateKeys = () =>

const mullByModule = (val1, val2) => {
  console.log(val1, val2);
  console.log(`${BitArray.toNumber(val1.slice().reverse())}`);
  console.log(`${BitArray.toNumber(val2.slice().reverse())}`);

  const result = ((BitArray.toNumber(val1.reverse()) * BitArray.toNumber(val2.reverse())) % MULL_CONST);

  console.log(`Result in func: ${result}`);

  const resultBin = BitArray.factory(result).toJSON();
  binExtend(resultBin, 16);

  console.log(resultBin);

  return resultBin;
};


const addByModule = (val1, val2) => {
  console.log(val1, val2);
  console.log(`${BitArray.toNumber(val1.slice().reverse())}`);
  console.log(`${BitArray.toNumber(val2.slice().reverse())}`);

  const result = ((BitArray.toNumber(val1.reverse()) + BitArray.toNumber(val2.reverse())) % ADD_CONST);

  console.log(`Result in func: ${result}`);

  const resultBin = BitArray.factory(result).toJSON();
  binExtend(resultBin, 16);

  console.log(resultBin);

  return resultBin;
};


function generateKeys() {
  const roundKeys = {};
  const rounds = 9;

  for (let roundIndex = 0; roundIndex < rounds; roundIndex++) {
    const roundKey = shift(key, (52 * roundIndex));
    roundKeys[roundIndex] = arrDivide(roundKey, 16);
  }
  return roundKeys;
}


function round(block, roundKeys, roundIndex) {

  console.log(block);
  const roundBlocks = arrDivide(block, 16);

  console.log(`----- Round ${roundIndex} -----`);
  console.log(`1: ${roundBlocks[0]}`);
  console.log(`2: ${roundKeys[roundIndex][0]}`);

  console.log(`----- 1 -----`);
  roundBlocks[0] = mullByModule(roundBlocks[0], roundKeys[roundIndex][0]);
  roundBlocks[3] = mullByModule(roundBlocks[3], roundKeys[roundIndex][3]);
  roundBlocks[1] = addByModule(roundBlocks[1], roundKeys[roundIndex][1]);
  roundBlocks[2] = addByModule(roundBlocks[2], roundKeys[roundIndex][2]);

  console.log(`----- 2 -----`);

  let tmpRoundBlock1 = BitArray.xor(roundBlocks[0], roundBlocks[2], BitArray.factory(0, 16));
  let tmpRoundBlock2 = BitArray.xor(roundBlocks[1], roundBlocks[3], BitArray.factory(0, 16));

  console.log(`----- 3 -----`);

  tmpRoundBlock1 = mullByModule(tmpRoundBlock1, roundKeys[roundIndex][4]);
  tmpRoundBlock2 = addByModule(tmpRoundBlock1, tmpRoundBlock2);

  console.log(`----- 4 -----`);

  tmpRoundBlock2 = mullByModule(tmpRoundBlock2, roundKeys[roundIndex][5]);
  tmpRoundBlock1 = addByModule(tmpRoundBlock1, tmpRoundBlock2);

  console.log(`----- 5 -----`);

  roundBlocks[0] = mullByModule(roundBlocks[0], tmpRoundBlock2);

  console.log(`----- 5.1 -----`);

  roundBlocks[1] = mullByModule(roundBlocks[1], tmpRoundBlock1);

  console.log(`----- 5.2 -----`);

  roundBlocks[2] = addByModule(roundBlocks[2], tmpRoundBlock2);

  console.log(`----- 5.3 -----`);

  roundBlocks[3] = addByModule(roundBlocks[3], tmpRoundBlock1);

  console.log(`----- 5.4 -----`);


  [roundBlocks[1], roundBlocks[2]] = [roundBlocks[2], roundBlocks[1]];

  return [].concat(...roundBlocks);
}

function finalRound(block, roundKeys, roundIndex) {
  console.log(block);
  const roundBlocks = arrDivide(block, 16);

  console.log(`----- Final Round -----`);
  console.log(`1: ${roundBlocks[0]}`);
  console.log(`2: ${roundKeys[roundIndex][0]}`);

  roundBlocks[0] = mullByModule(roundBlocks[0], roundKeys[roundIndex][0]);
  roundBlocks[3] = mullByModule(roundBlocks[3], roundKeys[roundIndex][3]);
  roundBlocks[1] = addByModule(roundBlocks[1], roundKeys[roundIndex][1]);
  roundBlocks[2] = addByModule(roundBlocks[2], roundKeys[roundIndex][2]);

  return [].concat(...roundBlocks);
}

export function crypt(text) {
  const roundKeys = generateKeys();
  let block = Array.from(new Array(64), () => Math.floor(2 * Math.random()));

  for (let i = 0; i < 8; i++) {
    block = round(block, roundKeys, i);

    console.log(`Block ${i}: ${block}`);
  }

  const cryptedText = finalRound(block, roundKeys, 8);

  console.log(cryptedText);

  return cryptedText;
}

crypt('1');
