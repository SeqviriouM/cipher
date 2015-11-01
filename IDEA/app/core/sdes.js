import BitArray from 'node-bitarray';


const key = BitArray.fromBinary('1111010110').toJSON().reverse();
const extendTransposition = [1, 4, 3, 4, 2, 1, 3, 2];
const transposition = [3, 4, 2, 1];
const s1 = [[0, 1, 2, 1], [2, 3, 0, 3], [2, 1, 2, 1], [3, 0, 3, 0]];
const s2 = [[0, 2, 0, 1], [0, 1, 3, 2], [3, 2, 3, 1], [0, 2, 3, 1]];

const directKey = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
const pCompression = [6, 3, 7, 4, 8, 5, 10, 9];
const nach = [2, 6, 3, 1, 4, 8, 5, 7];
const con = [4, 1, 3, 5, 7, 2, 8, 6];


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
