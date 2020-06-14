const mongoose = require('mongoose');

const BlockchainSchema = mongoose.Schema({
  chain: [
    {
      index: {
        type: Number,
      },
      timeStamp: {
        type: String,
      },
      transactions: [
        {
          amount: {
            type: Number,
          },
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
          reciever: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
          transactionId: {
            type: String,
          },
        },
      ],
      nonce: {
        type: String,
      },
      hash: {
        type: String,
      },
      previousBlockHash: {
        type: String,
      },
    },
  ],
  pendingTransactions: [
    {
      amount: {
        type: Number,
      },
      sender: {
        type: String,
      },
      reciever: {
        type: String,
      },
      transactionId: {
        type: String,
      },
    },
  ],
  currentNodeUrl: {
    type: String,
  },
});

module.exports = Blockchain = mongoose.model('blockchain', BlockchainSchema);
