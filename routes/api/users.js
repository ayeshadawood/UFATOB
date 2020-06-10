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

    const { name, email, password, type } = req.body;

    try {
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

      user = new User({
        name,
        email,
        type,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const blockchain = new Blockchain({
        user: user.id,
        currentNodeUrl: 'http://localhost:5000',
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

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
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
    const user = await User.findById(req.user.id);
    user.avatar = gravatar.url(user.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
