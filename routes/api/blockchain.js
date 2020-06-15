const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Blockchain = require('../../models/Blockchain');
const { v1 } = require('uuid');
const { check, validationResult } = require('express-validator');
const {
  proofOfWork,
  chainIsValid,
  hashBlock,
} = require('../../utils/blockchain');
const { connectDB } = require('../../config/db');
const config = require('config');

// @route   GET api/blockchain/transactions/:id
// @desc    Get all transactions of a blockchain of user
// @access  Private
router.get('/transactions/:id', auth, async (req, res) => {
  let result = [];

  try {
    await connectDB(`${req.params.id}`);

    const blockchains = await Blockchain.find();
    const chain = blockchains[0].chain;

    await connectDB(config.get('defaultMongoDatabase'));

    for (let i = 0; i < chain.length; i++) {
      const block = chain[i];

      for (let j = 0; j < block.transactions.length; j++) {
        const transaction = block.transactions[j];

        const sender = await User.findById(transaction.sender).select('name');

        const reciever = await User.findById(transaction.reciever).select(
          'name'
        );

        result = [
          ...result,
          {
            amount: transaction.amount,
            sender,
            reciever,
            timeStamp: transaction.timeStamp,
          },
        ];
      }
    }

    res.json(result);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   GET api/blockchain/my-transactions
// @desc    Get all transactions for current user
// @access  Private
router.get('/my-transactions', auth, async (req, res) => {
  let result = [];

  try {
    await connectDB(`${req.user.id}`);

    const blockchains = await Blockchain.find();
    const chain = blockchains[0].chain;
    const pending = blockchains[0].pendingTransactions;

    await connectDB(config.get('defaultMongoDatabase'));

    const user = await User.findById(req.user.id).select('type');

    // Getting all the verified transactions
    for (let i = 0; i < chain.length; i++) {
      const block = chain[i];

      for (let j = 0; j < block.transactions.length; j++) {
        const transaction = block.transactions[j];

        if (user.type === 0) {
          const sender = await User.findById(transaction.sender).select('name');

          const reciever = await User.findById(transaction.reciever).select(
            'name'
          );

          result = [
            ...result,
            {
              amount: transaction.amount,
              sender,
              reciever,
              timeStamp: transaction.timeStamp,
              status: 1,
            },
          ];
        } else {
          if (
            user._id.toString() === transaction.sender.toString() ||
            user._id.toString() === transaction.reciever.toString()
          ) {
            const sender = await User.findById(transaction.sender).select(
              'name'
            );

            const reciever = await User.findById(transaction.reciever).select(
              'name'
            );

            result = [
              ...result,
              {
                amount: transaction.amount,
                sender,
                reciever,
                timeStamp: transaction.timeStamp,
                status: 1,
              },
            ];
          } else continue;
        }
      }
    }

    // Getting all the pending transactions
    for (let i = 0; i < pending.length; i++) {
      const transaction = pending[i];

      if (user.type === 0) {
        const sender = await User.findById(transaction.sender).select('name');

        const reciever = await User.findById(transaction.reciever).select(
          'name'
        );

        result = [
          ...result,
          {
            amount: transaction.amount,
            sender,
            reciever,
            timeStamp: transaction.timeStamp,
            status: 0,
          },
        ];
      } else {
        if (
          user._id.toString() === transaction.sender.toString() ||
          user._id.toString() === transaction.reciever.toString()
        ) {
          const sender = await User.findById(transaction.sender).select('name');

          const reciever = await User.findById(transaction.reciever).select(
            'name'
          );

          result = [
            ...result,
            {
              amount: transaction.amount,
              sender,
              reciever,
              timeStamp: transaction.timeStamp,
              status: 0,
            },
          ];
        } else continue;
      }
    }

    res.json(result);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   GET api/blockchain
// @desc    Get all blockchains with validity
// @access  Private
router.get('/', auth, async (req, res) => {
  let result = [];

  try {
    await connectDB(config.get('defaultMongoDatabase'));

    const users = await User.find({ type: { $lte: 1 } });

    for (let i = 0; i < users.length; i++) {
      let user = users[i];

      await connectDB(`${user._id}`);

      const blockchains = await Blockchain.find();

      const validChain = chainIsValid(blockchains[0].chain);

      await connectDB(config.get('defaultMongoDatabase'));

      user = await User.findById(blockchains[0].currentNodeUrl);

      result = [
        ...result,
        {
          currentNodeUrl: {
            id: blockchains[0].currentNodeUrl,
            name: user.name,
            email: user.email,
          },
          validChain,
        },
      ];
    }

    res.json(result);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   GET api/blockchain/:id
// @desc    Get blockchain by user id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    await connectDB(`${req.params.id}`);

    const blockchains = await Blockchain.find();
    res.json(blockchains[0]);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   POST api/blockchain/transaction
// @desc    Create a new transaction
// @access  Private
router.post(
  '/transaction',
  [
    auth,
    check('amount', 'Amount is required').isInt(),
    check('reciever', 'Reciever is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, reciever } = req.body;

    try {
      // Updating the blockchain of the current user
      await connectDB(`${req.user.id}`);

      const blockchains = await Blockchain.find();
      blockchains[0].pendingTransactions.push({
        amount,
        sender: req.user.id,
        reciever,
        transactionId: v1().split('-').join(''),
      });

      await blockchains[0].save();

      // Updating the blockchain for the rest of the users
      await connectDB(config.get('defaultMongoDatabase'));

      const users = await User.find({
        _id: { $ne: req.user.id },
        type: { $lte: 1 },
      }).select('_id');

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        await connectDB(`${user.id}`);

        const blockchains = await Blockchain.find();
        blockchains[0].pendingTransactions.push({
          amount,
          sender: req.user.id,
          reciever,
          transactionId: v1().split('-').join(''),
        });

        await blockchains[0].save();
      }

      // Return the blockchain of the current user
      res.send({ msg: 'Transaction created' });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/blockchain/mine
// @desc    Create a new block in blockchain
// @access  Private
router.put('/mine', auth, async (req, res) => {
  try {
    // Creating the new block for the current user
    await connectDB(`${req.user.id}`);

    const blockchains = await Blockchain.find();

    const lastBlock = blockchains[0].chain[blockchains[0].chain.length - 1];
    const previousBlockHash = lastBlock['hash'];

    const currentBlockData = {
      transactions: blockchains[0].pendingTransactions,
      index: lastBlock['index'] + 1,
    };

    const nonce = proofOfWork(previousBlockHash, currentBlockData);

    const hash = hashBlock(previousBlockHash, currentBlockData, nonce);

    const newBlock = {
      index: lastBlock['index'] + 1,
      timeStamp: Date.now(),
      transactions: blockchains[0].pendingTransactions,
      nonce,
      hash,
      previousBlockHash,
    };

    blockchains[0].chain.push(newBlock);

    blockchains[0].pendingTransactions = [];

    await blockchains[0].save();

    // Adding the newly created block in the blockchain of the rest of the users
    await connectDB(config.get('defaultMongoDatabase'));

    const users = await User.find({
      _id: { $ne: req.user.id },
      type: { $lte: 1 },
    }).select('_id');

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      await connectDB(`${user.id}`);

      const blockchains = await Blockchain.find();

      blockchains[0].chain.push(newBlock);

      blockchains[0].pendingTransactions = [];

      await blockchains[0].save();
    }

    res.json(blockchains[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
