import bcrypt from 'bcrypt';
import { aes, utf8 } from 'crypto-js';

async function generateSalt() {
  const salt = await bcrypt.genSalt(14);
  return salt;
}

async function configureSalt(userData) {
  let salt;

  if (!userData.salt) {
    salt = await generateSalt();
  } else {
    salt = userData.salt;
  }

  return salt;
}

async function configureKey(salt, password) {
  const key = await bcrypt.hash(password, salt);
  return key;
}

function encrypt(data, key) {
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
  configureSalt,
  configureKey,
  encrypt,
  decrypt
}