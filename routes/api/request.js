const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
//const User = require("../../models/User");
const Request = require("../../models/Request");

// @route   POST api/request
// @desc    Create a request for fund
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is Required")
        .not()
        .isEmpty(),

      check("name", "Name is Required")
        .not()
        .isEmpty(),

      check("cnic", "CNIC is Required")
        .not()
        .isEmpty(),

      check("dateofbirth", "Date of Birth is Required")
        .not()
        .isEmpty(),

      check("gender", "Please select Gender")
        .not()
        .isEmpty(),

      check("institute", "Please select is Institute")
        .not()
        .isEmpty(),

      check("campus", "Campus is Required")
        .not()
        .isEmpty(),

      check("registrationnumber", "Registration Number is Required")
        .not()
        .isEmpty(),

      check("department", "Department is Required")
        .not()
        .isEmpty(),

      check("requestdescription", "Please fill the description for the request")
        .not()
        .isEmpty()
    ]
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
      fathername,
      cnic,
      dateofbirth,
      gender,
      institute,
      campus,
      registrationnumber,
      degreeprogram,
      department,
      semester,
      requestdescription
    } = req.body;

    // Get fields
    const requestFields = {};
    requestFields.user = req.user.id;
    if (title) requestFields.title = title;
    if (name) requestFields.name = name;
    if (fathername) requestFields.fathername = fathername;
    if (cnic) requestFields.cnic = cnic;
    if (dateofbirth) requestFields.dateofbirth = dateofbirth;
    if (gender) requestFields.gender = gender;
    if (institute) requestFields.institute = institute;
    if (campus) requestFields.campus = campus;
    if (registrationnumber)
      requestFields.registrationnumber = registrationnumber;
    if (degreeprogram) requestFields.degreeprogram = degreeprogram;
    if (department) requestFields.department = department;
    if (semester) requestFields.semester = semester;
    if (requestdescription)
      requestFields.requestdescription = requestdescription;

    console.log(requestFields);

    try {
      //creating profile
      request = new Request(requestFields);
      await request.save();
      res.json(request);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route   GET api/request
// @desc    Show all fund requests for uni and hec portal
// @access  Public
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({ date: -1 });

    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/request/:id
// @desc    Get  all Request by a user
// @access  Private
router.get("/user", auth, async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id });
    console.log("req.params.user");
    if (requests.length === 0) {
      return res.status(404).json({ msg: "No Fund Request Found" });
    }

    res.json(requests);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "No Fund Request Found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/request/single/:id
// @desc    Get a request by request Id
// @access  Private
router.get("/single/:id", auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: "Fund Request Not Found" });
    }

    res.json(request);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Fund Request Not Found" });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
