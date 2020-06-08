const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Request = require('../../models/Request');

// @route   POST /api/requests
// @desc    Create a request for fund
// @access  Private
router.post(
  '/',
  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('institute', 'Institute is required').not().isEmpty(),
    check('department', 'Department is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      name,
      fatherName,
      cnic,
      dateOfBirth,
      institute,
      campus,
      registrationNumber,
      degreeProgram,
      department,
      semester,
      description,
      status,
    } = req.body;

    // Get fields
    const requestFields = {};
    requestFields.user = req.user.id;
    requestFields.title = title;
    requestFields.name = name;
    if (fatherName) requestFields.fatherName = fatherName;
    if (cnic) requestFields.cnic = cnic;
    if (dateOfBirth) requestFields.dateOfBirth = dateOfBirth;
    requestFields.institute = institute;
    if (campus) requestFields.campus = campus;
    if (registrationNumber)
      requestFields.registrationNumber = registrationNumber;
    if (degreeProgram) requestFields.degreeProgram = degreeProgram;
    requestFields.department = department;
    if (semester) requestFields.semester = semester;
    requestFields.description = description;
    requestFields.status = status;

    try {
      const request = new Request(requestFields);

      await request.save();
      res.json(request);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

// // @route   GET api/request
// // @desc    Show all fund requests for uni and hec portal
// // @access  Public
// router.get('/', async (req, res) => {
//   try {
//     const requests = await Request.find().sort({ date: -1 });

//     res.json(requests);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route   GET /api/requests/user
// @desc    Get all requests of user
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id });
    res.json(requests);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/requests/:id
// @desc    Get request by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    res.json(request);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
