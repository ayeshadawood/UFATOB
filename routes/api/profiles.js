const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { connectDB, dropDB } = require('../../config/db');
const config = require('config');

// @route   GET api/profiles
// @desc    Get all profiles
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   GET api/profiles/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    await connectDB(config.get('defaultMongoDatabase'));

    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('users', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile does not exist' });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profiles
// @desc    Create or edit user profile
// @access  Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
    contactNo,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (contactNo) profileFields.contactNo = contactNo;

  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    await connectDB(config.get('defaultMongoDatabase'));

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profiles/id
// @desc    Get a Profile by user_id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    }).populate('user', ['name', 'avatar', 'email']);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   Delete api/profile
// @desc    Delete Profile, User, Posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await connectDB(config.get('defaultMongoDatabase'));

    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    await dropDB(`${req.user.id}`);

    res.json({ msg: 'User Removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   Put api/profile/experience
// @desc    Adding Experience to the Profile
// @access  Private
router.put(
  '/experience',
  [
    auth,
    check('title', 'Title is Required').not().isEmpty(),
    check('company', 'Company is Required').not().isEmpty(),
    check('from', 'From date is Required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      await connectDB(config.get('defaultMongoDatabase'));

      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);

      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(5000).send('Server Error');
    }
  }
);

// @route   Put api/profile/education
// @desc    Adding Education to the Profile
// @access  Private
router.put(
  '/education',
  [
    auth,
    check('school', 'School is Required').not().isEmpty(),
    check('degree', 'Degree is Required').not().isEmpty(),
    check('from', 'From date is Required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      await connectDB(config.get('defaultMongoDatabase'));

      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(5000).send('Server Error');
    }
  }
);

// @route   Delete api/profiles/experience/:exp_id
// @desc    Delete Profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    await connectDB(config.get('defaultMongoDatabase'));

    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   Delete api/profiles/education/:edu_id
// @desc    Delete Profile education
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    await connectDB(config.get('defaultMongoDatabase'));

    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
