const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1');

function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];

  this.currentNodeUrl = currentNodeUrl;

  this.networkNodes = [];

  //genesis block
  this.creatNewBlock(100, '0', '0');
}

Blockchain.prototype.creatNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timeStamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash,
  };

  this.pendingTransactions = [];
  this.chain.push(newBlock);
  return newBlock;
};

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction = function (
  amount,
  sender,
  receiver
) {
  const newTransaction = {
    amount: amount,
    sender: sender,
    receiver: receiver,
    transactionId: uuid().split('-').join(''),
  };
  return newTransaction;
};

Blockchain.prototype.addTransactionToPendingTransactions = function (
  transactionObj
) {
  this.pendingTransactions.push(transactionObj);
  return this.getLastBlock()['index'] + 1;
};

Blockchain.prototype.hashBlock = function (
  previousBlockHash,
  currentBlockData,
  nonce
) {
  const dataAsString =
    previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);

  const hash = sha256(dataAsString);
  return hash;
};

Blockchain.prototype.proofOfWork = function (
  previousBlockHash,
  currentBlockData
) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  }
  return nonce;
};

Blockchain.prototype.chainIsValid = function (blockchain) {
  let validChain = true;
  for (var i = 1; i < blockchain.length; i++) {
    const currentBlock = blockchain[i];
    const prevBlock = blockchain[i - 1];
    const blockHash = this.hashBlock(
      prevBlock['hash'],
      {
        transactions: currentBlock['transactions'],
        index: currentBlock['index'],
      },
      currentBlock['nonce']
    );
    // console.log("previous block has is: " + prevBlock["hash"]);
    // console.log("transaction data is :" + currentBlock["transactions"]);
    // console.log("current index is " + currentBlock["index"]);
    // console.log("nonce is " + currentBlock["nonce"]);
    // console.log("Hash calculated is :" + blockHash);
    if (blockHash.substring(0, 4) !== '0000') validChain = false;
    if (currentBlock['previousBlockHash'] !== prevBlock['hash'])
      validChain = false;
  }
  const genesisBlock = blockchain['0'];
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

Blockchain.prototype.getBlock = function (blockHash) {
  let correctBlock = null;
  this.chain.forEach((block) => {
    if (block.hash === blockHash) correctBlock = block;
  });
  return correctBlock;
};

Blockchain.prototype.getTransaction = function (transactionId) {
  let correctTransaction = null;
  let correctBlock = null;

  this.chain.forEach((block) => {
    block.transactions.forEach((transaction) => {
      if (transaction.transactionId === transactionId) {
        correctTransaction = transaction;
        correctBlock = block;
      }
    });
  });
  return {
    transaction: correctTransaction,
    block: correctBlock,
  };
};

Blockchain.prototype.getAddressData = function (address) {
  const addressTransactions = [];
  this.chain.forEach((block) => {
    block.transactions.forEach((transaction) => {
      if (transaction.sender === address || transaction.receiver === address) {
        addressTransactions.push(transaction);
      }
    });
  });
  let balance = 0;
  addressTransactions.forEach((transaction) => {
    if (transaction.receiver === address) balance += transaction.amount;
    if (transaction.sender === address) balance -= transaction.amount;
  });
  return {
    addressTransactions: addressTransactions,
    addressBalance: balance,
  };
};

module.exports = Blockchain;
