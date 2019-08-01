import bcrypt from 'bcryptjs';
import aes from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';

async function generateSalt() {
  const salt = await bcrypt.genSalt(14);
  return salt;
}

async function generateKey(salt, password) {
  const key = await bcrypt.hash(password, salt);
  return key;
}

function encrypt(data, key) {
  const encrypted = aes.encrypt(JSON.stringify(data), key);
  console.log(encrypted.toString());
  return aes.encrypt(JSON.stringify(data), key).toString();
}

function decrypt(encrypted, key) {
  let data = aes.decrypt(encrypted, key).toString(utf8);

  try {
    data = JSON.parse(data);
  } catch(err) {
    data = false;
    console.log(err);
  }

  return data;
}

export {
  generateSalt,
  generateKey,
  encrypt,
  decrypt
}