const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Blockchain = require('../../models/Blockchain');
const { connectDB, dropDB } = require('../../config/db');

// @route   GET /api/users/university
// @desc    Get all universities
// @access  Private
router.get('/university', auth, async (req, res) => {
  try {
    await connectDB(config.get('defaultMongoDatabase'));

    const universities = await User.find({ type: 1 }).select('-password');
    res.json(universities);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/users/university/:id
// @desc    Delete a university
// @access  Private
router.delete('/university/:id', auth, async (req, res) => {
  try {
    await connectDB(config.get('defaultMongoDatabase'));

    await Profile.findOneAndRemove({ user: req.params.id });

    await User.findOneAndRemove({ _id: req.params.id });

    await dropDB(`${req.params.id}`);

    res.json({ msg: 'University Removed' });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   POST /api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('type', 'Account type is required').isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, type, university } = req.body;

    try {
      await connectDB(config.get('defaultMongoDatabase'));

      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      const userFields = {
        name,
        email,
        type,
        avatar,
      };

      if (university) userFields.university = university;

      user = new User(userFields);

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      if (type < 2) {
        await connectDB(`${user.id}`);

        const blockchain = new Blockchain({
          currentNodeUrl: user.id,
          chain: [
            {
              index: 0,
              timeStamp: Date.now(),
              nonce: '100',
              hash: '0',
              previousBlockHash: '0',
            },
          ],
        });

        await blockchain.save();
      }

      res.json({ msg: 'User created' });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /api/users/password
// @desc    Change password
// @access  Private
router.put(
  '/password',
  [
    auth,
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      await connectDB(config.get('defaultMongoDatabase'));

      const user = await User.findById(req.user.id);

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json({ msg: 'Password updated' });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /api/users/name
// @desc    Change name
// @access  Private
router.put(
  '/name',
  [auth, check('name', 'Name is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      await connectDB(config.get('defaultMongoDatabase'));

      const user = await User.findById(req.user.id);

      user.name = name;

      await user.save();
      res.json(user);
    } catch (err) {
      return res.status(500).send('Server error');
    }
  }
);

// @route   PUT /api/users/profile-picture/upload
// @desc    Upload profile picture
// @access  Private
router.put(
  '/profile-picture/upload',
  [auth, check('image', 'Image is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { image } = req.body;

    try {
      await connectDB(config.get('defaultMongoDatabase'));

      const user = await User.findById(req.user.id);
      user.avatar = image;

      await user.save();
      res.json(user);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /api/users/profile-picture/remove
// @desc    Remove profile picture
// @access  Private
router.put('/profile-picture/remove', auth, async (req, res) => {
  try {
    await connectDB(config.get('defaultMongoDatabase'));

    const user = await User.findById(req.user.id);

    user.avatar = gravatar.url(user.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    await user.save();
    res.json(user);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
