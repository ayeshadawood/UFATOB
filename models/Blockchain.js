const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BlockchainSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
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
  networkNodes: [
    {
      url: {
        type: String,
      },
    },
  ],
});

module.exports = Blockchain = mongoose.model('blockChain', BlockchainSchema);
