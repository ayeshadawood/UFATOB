const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Blockchain = require('../../models/Blockchain');
const { connectDB } = require('../../config/db');
const config = require('config');
const auth = require('../../middleware/auth');

// @route   GET api/data-visualization/university
// @desc    Get the statistics data by univeristy
// @access  Private
router.get('/university', auth, async (req, res) => {
  let result = {};

  try {
    // Fetching the admin user
    await connectDB(config.get('defaultMongoDatabase'));

    let user = await User.findOne({ type: 0 });

    // Connecting to the admin database and fetching blockchain
    await connectDB(`${user.id}`);

    const blockchains = await Blockchain.find();
    const chain = blockchains[0].chain;

    await connectDB(config.get('defaultMongoDatabase'));

    // Iterating over the chain of blockchain
    for (let i = 0; i < chain.length; i++) {
      const block = chain[i];
      const transactions = block.transactions;

      // Iterating over the transactions in the current block
      for (let j = 0; j < transactions.length; j++) {
        const transaction = transactions[j];

        user = await User.findById(transaction.reciever).select('-password');

        // If the user is a student then continue
        if (user.type === 2) continue;

        // If the entry of user does not exist then initialize it otherwise add the amount
        if (!result[`${user.name}`]) {
          result[`${user.name}`] = transaction.amount;
        } else {
          result[`${user.name}`] += transaction.amount;
        }
      }
    }

    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

// @route   GET api/data-visualization/year
// @desc    Get the statistics data by year
// @access  Private
router.get('/year', auth, async (req, res) => {
  let result = {};

  try {
    // Fetching the admin user
    await connectDB(config.get('defaultMongoDatabase'));

    let user = await User.findOne({ type: 0 });

    // Connecting to the admin database and fetching blockchain
    await connectDB(`${user.id}`);

    const blockchains = await Blockchain.find();
    const chain = blockchains[0].chain;

    await connectDB(config.get('defaultMongoDatabase'));

    // Iterating over the chain of blockchain
    for (let i = 0; i < chain.length; i++) {
      const block = chain[i];
      const transactions = block.transactions;

      // Iterating over the transactions in the current block
      for (let j = 0; j < transactions.length; j++) {
        const transaction = transactions[j];

        user = await User.findById(transaction.reciever).select('-password');

        // If the user is a student then continue
        if (user.type === 2) continue;

        const date = new Date(transaction.timeStamp);
        const year = date.getFullYear();

        // Add the entry in the corresponding date property
        if (!result[year]) {
          result[year] = { [`${user.name}`]: transaction.amount };
        } else {
          // If the entry does not exist for current year then create one otherwise add the amount
          if (!result[year][`${user.name}`]) {
            result[year] = {
              ...result[year],
              [`${user.name}`]: transaction.amount,
            };
          } else {
            result[year] = {
              ...result[year],
              [`${user.name}`]:
                result[year][`${user.name}`] + transaction.amount,
            };
          }
        }
      }
    }

    res.json(result);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
