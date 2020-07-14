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
          title: {
            type: String,
          },
          detail: {
            type: String,
          },
          reference: {
            type: String,
          },
          amount: {
            type: Number,
          },
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
          reciever: {
            type: String,
          },
          recieverName: {
            type: String,
          },
          transactionId: {
            type: String,
          },
          timeStamp: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      nonce: {
        type: Number,
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
      title: {
        type: String,
      },
      detail: {
        type: String,
      },
      reference: {
        type: String,
      },
      amount: {
        type: Number,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      reciever: {
        type: String,
      },
      recieverName: {
        type: String,
      },
      transactionId: {
        type: String,
      },
      timeStamp: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  currentNodeUrl: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = Blockchain = mongoose.model('blockchain', BlockchainSchema);
