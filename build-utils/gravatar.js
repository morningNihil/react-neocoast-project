import CryptoJS from 'crypto-js';

const getGravatar = (email) => {
  const emailTrimmed = email.trim().toLowerCase();
  const hash = CryptoJS.SHA256(emailTrimmed).toString();
  return `https://www.gravatar.com/avatar/${hash}?s=200&d=robohash&f=y`;
};

export default getGravatar;
