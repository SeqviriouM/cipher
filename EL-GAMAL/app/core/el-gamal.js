import bigInt from 'big-integer';

const p = 809;
//const a = 1;
//const b = 4;
const g = 3;


const x = Math.floor(Math.random() * (p - 1) + 1);
const y = bigInt(g).modPow(x, p).value;
const k = Math.floor(Math.random() * (p - 2) + 1);
const a = bigInt(g).pow(k);


export function encrypt (text) {
  const encryptedData = text.map((item) => bigInt(y).pow(k).multiply(item).mod(p).value).join('-');

  console.log(encryptedData);

  return encryptedData;
}


export function decrypt (text) {
    const decryptedData = text.map((item) =>  bigInt(item).multiply(bigInt(a).modPow((p - 1 - x) , p)).mod(p));

    return decryptedData.map((item) => String.fromCharCode(item));
}

