const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Blockchain = require('../../models/Blockchain');

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
router.post('/transaction', auth, async (req, res) => {
  try {
    let blockchain = await Blockchain.findOne({ user: req.user.id });

    blockchain.pendingTransactions.push({
      amount: '100',
      sender: 'SENDER',
      reciever: 'RECEIVER',
      transactionId: '12345678',
    });

    await blockchain.save();
    res.json(blockchain);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
