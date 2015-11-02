import BitArray from 'node-bitarray';


// const key = BitArray.fromBinary('1111010110').toJSON().reverse();


const permutation = (input, scheme) => input.map((item, index, arr) => arr[scheme[index] - 1]);

const shift = (input, shiftValue) => input.map((item, index, arr) => arr[(index + shiftValue) % arr.length]);

const size = (input, scheme) => scheme.map((item) => input[item - 1]);

const key = Array.from(new Array(128), () => Math.floor(2 * Math.random()));

const arrDivide = (input, blockSize) => Array.from(new Array(input.length / blockSize), (item, index) => input.slice(index * blockSize, index * blockSize + blockSize));

// const generateKeys = () =>

function generateKeys() {
  const roundKeys = {};
  const rounds = 8;

  for (let roundIndex = 0; roundIndex < rounds; roundIndex++) {
    const roundKey = shift(key, (52 * roundIndex));
    roundKeys[roundIndex] = arrDivide(roundKey, 16);
  }
  return roundKeys;
}


function round(block, roundKeys, roundIndex) {
  const roundBlocks = arrDivide(block, 16);
  roundBlocks[0] = BitArray.and(roundBlocks[0], roundKeys[roundIndex][0]);
  roundBlocks[3] = BitArray.and(roundBlocks[3], roundKeys[roundIndex][3]);
}


export function crypt(text) {
  const roundKeys = generateKeys();

  const block = Array.from(new Array(64), () => Math.floor(2 * Math.random()));
  round(block, roundKeys, 0);
}

crypt('1');
