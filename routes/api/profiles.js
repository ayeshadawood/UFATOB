const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/user-profiles/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
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

// @route   POST api/user-profiles
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    check('status', 'Status is Required').not().isEmpty(),
    check('skills', 'Skills is Required').not().isEmpty(),
  ],
  async (req, res) => {
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
    } = req.body;

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;

    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //Social object;
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
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
  }
);

// // @route   GET api/profile
// // @desc    Get All Profiles
// // @access  Public
// router.get('/', async (req, res) => {
//   try {
//     const user-profiles = await Profile.find().populate('user', ['name', 'avatar']);

//     res.json(user-profiles);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route   GET api/profile/user/:user_id
// // @desc    Get a Profile by user_id
// // @access  Public
// router.get('/user/:user_id', async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       user: req.params.user_id,
//     }).populate('user', ['name', 'avatar']);

//     if (!profile) {
//       return res.status(400).json({ msg: 'Profile Not Found' });
//     }

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind == 'ObjectId') {
//       return res.status(400).json({ msg: 'Profile Not Found' });
//     }
//     res.status(500).send('Server Error');
//   }
// });

// @route   Delete api/profile
// @desc    Delete Profile, User, Posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    //removing Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //removing User
    await User.findOneAndRemove({ _id: req.user.id });

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
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //getting details
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
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //getting details
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
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(5000).send('Server Error');
    }
  }
);

// @route   Delete api/user-profiles/experience/:exp_id
// @desc    Delete Profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    //getting Profile
    const profile = await Profile.findOne({ user: req.user.id });
    //getting experience index
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

// @route   Delete api/user-profiles/education/:edu_id
// @desc    Delete Profile education
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    //getting Profile
    const profile = await Profile.findOne({ user: req.user.id });
    //getting experience index
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
