const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Blockchain = require('../../models/Blockchain');
const { v1 } = require('uuid');
const { check, validationResult } = require('express-validator');
const { proofOfWork, hashBlock } = require('../../utils/blockchain');

// @route   GET api/blockchain
// @desc    Get blockchain for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const blockchain = await Blockchain.findOne({ user: req.user.id });
    res.json(blockchain);
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
    check('sender', 'Sender is required').not().isEmpty(),
    check('reciever', 'Reciever is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, sender, reciever } = req.body;

    try {
      let blockchain = await Blockchain.findOne({ user: req.user.id });

      blockchain.pendingTransactions.push({
        amount,
        sender,
        reciever,
        transactionId: v1().split('-').join(''),
      });

      await blockchain.save();
      res.json(blockchain);
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
    let blockchain = await Blockchain.findOne({ user: req.user.id });

    const lastBlock = blockchain.chain[blockchain.chain.length - 1];
    const previousBlockHash = lastBlock['hash'];

    const currentBlockData = {
      transactions: blockchain.pendingTransactions,
      index: lastBlock['index'] + 1,
    };

    const nonce = proofOfWork(previousBlockHash, currentBlockData);

    const hash = hashBlock(previousBlockHash, currentBlockData, nonce);

    blockchain.chain.push({
      index: lastBlock['index'] + 1,
      timeStamp: Date.now(),
      transactions: blockchain.pendingTransactions,
      nonce,
      hash,
      previousBlockHash,
    });

    blockchain.pendingTransactions = [];

    await blockchain.save();
    res.json(blockchain);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
