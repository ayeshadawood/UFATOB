const sha256 = require('sha256');

// This function creates the hash for the new block
const hashBlock = (previousBlockHash, currentBlockData, nonce) => {
  const dataAsString =
    previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);

  const hash = sha256(dataAsString);
  return hash;
};

// This function checks if the chain is valid or not
const chainIsValid = (chain) => {
  let validChain = true;

  for (var i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const prevBlock = chain[i - 1];

    const blockHash = hashBlock(
      prevBlock['hash'],
      {
        transactions: currentBlock['transactions'],
        index: currentBlock['index'],
      },
      currentBlock['nonce']
    );

    if (blockHash.substring(0, 4) !== '0000') validChain = false;

    if (currentBlock['previousBlockHash'] !== prevBlock['hash'])
      validChain = false;
  }

  const genesisBlock = chain[0];

  const correctNonce = genesisBlock['nonce'] === 100;
  const correctHash = genesisBlock['hash'] === '0';
  const correctPreviousHash = genesisBlock['previousBlockHash'] === '0';
  const correctTransactions = genesisBlock['transactions'].length === 0;

  if (
    !correctNonce ||
    !correctHash ||
    !correctPreviousHash ||
    !correctTransactions
  )
    validChain = false;

  return validChain;
};

// This function generates the nonce value for which we get the required proof of work in hash
const proofOfWork = (previousBlockHash, currentBlockData) => {
  let nonce = 0;
  let hash = hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = hashBlock(previousBlockHash, currentBlockData, nonce);
  }
  return nonce;
};

module.exports = { proofOfWork, chainIsValid, hashBlock };
