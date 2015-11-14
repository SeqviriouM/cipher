import BitArray from 'node-bitarray';


// const key = BitArray.fromBinary('1111010110').toJSON().reverse();

// const key = Array.from(new Array(64), () => Math.floor(2 * Math.random()));

const key = [0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0];

const extendTransposition = [32, 1, 2, 3, 4, 5,
  4, 5, 6, 7, 8, 9,
  8, 9, 10, 11, 12, 13,
  12, 13, 14, 15, 16, 17,
  16, 17, 18, 19, 20, 21,
  20, 21, 22, 23, 24, 25,
  24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1,
];
const transposition = [16, 7, 20, 21, 29, 12, 28, 17,
  1, 15, 23, 26, 5, 18, 31, 10,
  2, 8, 24, 14, 32, 27, 3, 9,
  19, 13, 30, 6, 22, 11, 4, 25,
];


const s1 = [
  [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
  [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
  [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
  [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
];

const s2 = [
  [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
  [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
  [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
  [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
];

const s3 = [
  [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
  [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
  [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
  [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
];

const s4 = [
  [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
  [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
  [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
  [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
];

const s5 = [
  [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
  [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
  [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
  [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
];

const s6 = [
  [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
  [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
  [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
  [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
];

const s7 = [
  [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
  [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
  [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
  [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
];

const s8 = [
  [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
  [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
  [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
  [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
];

const s = [s1, s2, s3, s4, s5, s6, s7, s8];

const directKey = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18,
  10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36,
  63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22,
  14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];

const pCompression = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4,
  26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40,
  51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];

const shifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

const nach = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4,
              62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8,
              57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
              61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7];
const con = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31,
  38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29,
  36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27,
  34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25];


const permutation = (input, scheme) => input.map((item, index, arr) => arr[scheme[index] - 1]);

const shift = (input, shiftValue) => input.map((item, index, arr) => arr[(index + shiftValue) % arr.length]);

const size = (input, scheme) => scheme.map((item) => input[item - 1]);

const binExtend = (input, inputSize) => input.unshift(...Array.from(new Array(inputSize - input.length), () => 0));

const getValueFromBlock = (input, block) => {
  const copiedInput = input.slice();

  console.log(input);

  const valY = new BitArray(copiedInput.splice(1, 4).reverse()).toNumber();
  const valX = new BitArray(copiedInput.reverse()).toNumber();

  console.log('valY: ', valY);
  console.log('valX: ', valX);

  const result = block[valX][valY];
  const binResult = BitArray.factory(result).toJSON();

  binExtend(binResult, 4);

  return binResult;
};


const generateKeys = (localKey) => {
  const rounds = 16;
  const roundKeys = [];

  const transpositionKey = size(localKey, directKey);

  let C = transpositionKey.slice(0, 28);
  let D = transpositionKey.slice(28);

  for (let i = 0; i < rounds; i++) {
    C = shift(C, shifts[i]);
    D = shift(D, shifts[i]);

    const keyRound = size(C.concat(D), pCompression);
    roundKeys.push(keyRound);
  }

  return roundKeys;
};


const round = (input, input1, roundKey) => {
  const extendInput = size(input, extendTransposition);

  // console.log('extendInput: ', extendInput);
  // console.log('Round1 key: ', roundKey);

  const xorResult = BitArray.xor(extendInput, roundKey, BitArray.factory(0, 32));
  // console.log('XOR result: ', xorResult);

  const B = [];
  const blockValues = [];

  for (let i = 0; i < 8; i++) {
    B.push(xorResult.slice(6 * i, 6 * (i + 1)));
    blockValues.push(getValueFromBlock(B[i], s[i]));
  }

  // const s1Val = getValueFromBlock(L, s1);
  // const s2Val = getValueFromBlock(R, s2);

  // console.log('s1Val: ', s1Val);
  // console.log('s2Val: ', s2Val);

  const blockVal = [].concat(...blockValues);
  const valueWithTransposition = permutation(blockVal, transposition);

  // console.log('valueWithTransposition: ', valueWithTransposition);

  // console.log('Input: ', input);

  const output = BitArray.xor(valueWithTransposition, input1, BitArray.factory(0, 32));

  // console.log('Output: ', output);

  return output;
};


export function code(textForCoding) {
  console.log('--------------CODING--------------');

  const keys = generateKeys(key);
  const rounds = 16;

  console.log('Keys: ' + keys.length);

  const textWithPermutation = permutation(textForCoding, nach);

  let L0 = textWithPermutation.slice(0, 32);
  let R0 = textWithPermutation.slice(32);

  for (let i = 0; i < rounds; i++) {
    const L1 = R0.slice();
    const R1 = round(R0, L0, keys[i]);

    [ L0, R0 ] = [ L1, R1 ];
  }

  // [ L0, R0 ] = [ R0, L0 ];

  const LR = L0.concat(R0);

  console.log('LR: ' + LR);

  const ciphertext = permutation(LR, con);

  console.log('Text for coding: ' + textForCoding);
  console.log('Encrypted text: ' + ciphertext);


  const textWithPermutation_1 = permutation(ciphertext, nach);

  L0 = textWithPermutation_1.slice(0, 32);
  R0 = textWithPermutation_1.slice(32);

  for (let i = 15; i > -1; i--) {
    const R1 = L0.slice();
    const L1 = round(L0, R0, keys[i]);

    [ L0, R0 ] = [ L1, R1 ];
  }

  // [ L0, R0 ] = [ R0, L0 ];

  const LR_1 = L0.concat(R0);

  console.log('LR: ' + LR_1);

  const decodetext = permutation(LR_1, con);

  console.log('Decoded text: ' + decodetext);
  console.log('Default text: ' + textForCoding);
  // const textWithPermutation = permutation(textForCoding, nach);

  // const L0 = textWithPermutation.slice(0, 4);
  // const R0 = textWithPermutation.slice(4);

  // console.log('L0: ', L0);
  // console.log('R0: ', R0);


  // const L1 = R0.slice();
  // const R1 = round(L1, L0, key1);

  // console.log('L1: ', L1);
  // console.log('R1: ', R1);


  // const R2 = R1.slice();
  // const L2 = round(R2, L1, key2);

  // console.log('L2: ', L2);
  // console.log('R2: ', R2);

  // const LR2 = L2.concat(R2);
  // const ciphertext = permutation(LR2, con);

  // console.log('Ciphertext: ', ciphertext);

  // return ciphertext;
}


export function decode(textForDecoding) {
  console.log('-------------DECODING-------------');

  const textWithPermutation = permutation(textForDecoding, nach);

  const L2 = textWithPermutation.slice(0, 4);
  const R2 = textWithPermutation.slice(4);

  const R1 = round(R2, L2, key2);
  const L1 = R2.slice();

  const L0 = round(R1, L1, key1);
  const R0 = R1.slice();

  const LR0 = L0.concat(R0);
  const decodedtext = permutation(LR0, con);

  console.log('Decoded text: ', decodedtext);

  return decodedtext;
}


// const text = Array.from(new Array(64), () => Math.floor(2 * Math.random()));

const text = [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1];
code(text);