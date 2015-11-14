import BitArray from 'node-bitarray';


const key = BitArray.fromBinary('1111010110').toJSON().reverse();
const extendTransposition = [1, 4, 3, 4, 2, 1, 3, 2];
const transposition = [3, 4, 2, 1];
// const s1 = [[0, 1, 2, 1], [2, 3, 0, 3], [2, 1, 2, 1], [3, 0, 3, 0]];
// const s2 = [[0, 2, 0, 1], [0, 1, 3, 2], [3, 2, 3, 1], [0, 2, 3, 1]];

const s1 = [
  [0, 14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
  [1, 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
  [2, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
  [3, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
];

const s2 = [
  [0, 15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
  [1, 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
  [2, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
  [3, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
];

const s3 = [
  [0, 10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
  [1, 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
  [2, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
  [3, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
];

const s4 = [
  [0, 7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
  [1, 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
  [2, 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
  [3, 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
];

const s5 = [
  [0, 2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
  [1, 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
  [2, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
  [3, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
];

const s6 = [
  [0, 12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
  [1, 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
  [2, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
  [3, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
];

const s7 = [
  [0, 4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
  [1, 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
  [2, 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
  [3, 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
];

const s8 = [
  [0, 13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
  [1, 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
  [2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
  [3, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
];

const directKey = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
const pCompression = [6, 3, 7, 4, 8, 5, 10, 9];
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

const getValueFromBlock = (input, block) => {
  const copiedInput = input.slice();

  console.log(input);

  const valY = new BitArray(copiedInput.splice(1, 2).reverse()).toNumber();
  const valX = new BitArray(copiedInput.reverse()).toNumber();

  console.log('valY: ', valY);
  console.log('valX: ', valX);

  const result = block[valX][valY];

  return BitArray.factory(result, 2).reverse();
};


const { key1, key2 } = (() => {
  const workingKey = key.slice();

  console.log(workingKey);
  console.log('extendedTransposition: ', extendTransposition);
  console.log('transposition: ', transposition);

  const transpositionKey = permutation(key, directKey);
  const L0 = transpositionKey.slice(0, 5);
  const R0 = transpositionKey.slice(5);

  console.log('L0: ', L0);
  console.log('R0: ', R0);

  const shiftL01 = shift(L0, 1);
  const shiftR01 = shift(R0, 1);

  console.log('shift_L0_1: ', shiftL01);
  console.log('shift_R0_1: ', shiftR01);

  const keyRound1 = size(shiftL01.concat(shiftR01), pCompression);
  console.log('Key1: ', keyRound1);

  const shiftL02 = shift(shiftL01, 2);
  const shiftR02 = shift(shiftR01, 2);

  console.log('shift_L0_2: ', shiftL01);
  console.log('shift_R0_2: ', shiftR01);

  const keyRound2 = size(shiftL02.concat(shiftR02), pCompression);
  console.log('Key2: ', keyRound2);

  return {
    key1: keyRound1,
    key2: keyRound2,
  };
})();


const round = (input, input1, roundKey) => {
  const extendInput = size(input, extendTransposition);

  console.log('extendInput: ', extendInput);
  console.log('Round1 key: ', roundKey);

  const xorResult = BitArray.xor(extendInput, roundKey, BitArray.octet([]));
  console.log('XOR result: ', xorResult);

  const L = xorResult.slice(0, 4);
  const R = xorResult.slice(4);

  const s1Val = getValueFromBlock(L, s1);
  const s2Val = getValueFromBlock(R, s2);

  console.log('s1Val: ', s1Val);
  console.log('s2Val: ', s2Val);

  const blockVal = s1Val.concat(s2Val);
  const valueWithTransposition = permutation(blockVal, transposition);

  console.log('valueWithTransposition: ', valueWithTransposition);

  console.log('Input: ', input);

  const output = BitArray.xor(valueWithTransposition, input1, BitArray.factory(0, 4));

  console.log('Output: ', output);

  return output;
};


export function code(textForCoding) {
  console.log('--------------CODING--------------');

  const textWithPermutation = permutation(textForCoding, nach);

  const L0 = textWithPermutation.slice(0, 4);
  const R0 = textWithPermutation.slice(4);

  console.log('L0: ', L0);
  console.log('R0: ', R0);


  const L1 = R0.slice();
  const R1 = round(L1, L0, key1);

  console.log('L1: ', L1);
  console.log('R1: ', R1);


  const R2 = R1.slice();
  const L2 = round(R2, L1, key2);

  console.log('L2: ', L2);
  console.log('R2: ', R2);

  const LR2 = L2.concat(R2);
  const ciphertext = permutation(LR2, con);

  console.log('Ciphertext: ', ciphertext);

  return ciphertext;
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
