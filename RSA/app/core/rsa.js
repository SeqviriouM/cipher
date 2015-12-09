import bigInt from 'big-integer';
import sieve from 'sieve';

const primeNumbers = sieve(1000000, 1000);

function getE(number, currNumber) {
  let e = bigInt(number);
  while (!bigInt(e).isPrime() || bigInt(currNumber).mod(e) === 0) {
    e = bigInt(e).add(1);
  }
  return e.value;
}

function xgcd(a, b) {
  if (b.toString() === '0') {
    return [1, 0, a];
  }

  const [x, y, d] = xgcd(b, bigInt(a).mod(b));

  return [y, x - y * Math.floor(a / b), d];
}


const {E, D, N} = (() => {
  const p = primeNumbers[Math.floor(Math.random() * primeNumbers.length)];
  const q = primeNumbers[Math.floor(Math.random() * primeNumbers.length)];
  const n = bigInt(p).multiply(q).value;
  const fi = bigInt(p - 1).multiply(q - 1);
  const e = getE(fi.divide(2), fi);
  const d = xgcd(e, fi)[0] > 0 ? xgcd(e, fi)[0] : (fi + xgcd(e, fi)[0]);

  return { E: e, D: d, N: n};
})();


export function encrypt(text) {
  const encryptedData = text.map((item) => (bigInt(item).modPow(E, N).value));

  return encryptedData.join('-');
}


export function decrypt(text) {
  const decryptedData = text.map((item) => (bigInt(item).modPow(D, N).value));

  return decryptedData.map((item) => (String.fromCharCode(item)));
}

