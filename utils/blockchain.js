const sha256 = require('sha256');

const hashBlock = (previousBlockHash, currentBlockData, nonce) => {
  const dataAsString =
    previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);

  const hash = sha256(dataAsString);
  return hash;
};

const proofOfWork = (previousBlockHash, currentBlockData) => {
  let nonce = 0;
  let hash = hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = hashBlock(previousBlockHash, currentBlockData, nonce);
  }
  return nonce;
};

module.exports = { proofOfWork, hashBlock };
