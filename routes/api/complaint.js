const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Complaint = require("../../models/Complaint");

// @route   POST api/complaint
// @desc    Make a Complaint
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("email", "Email address is required")
        .not()
        .isEmpty(),

      check("complaintdetails", "The complaint details are required")
        .not()
        .isEmpty(),

      check("nature", "The nature of complaint is required")
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
      reference,
      complainantname,
      email,
      number,
      registrationnumber,
      regarding,
      nature,
      complaintdetails
    } = req.body;

    // Get fields
    const complaintFields = {};
    complaintFields.user = req.user.id;
    if (reference) complaintFields.reference = reference;
    if (complainantname) complaintFields.complainantname = complainantname;
    if (email) complaintFields.email = email;
    if (number) complaintFields.number = number;
    if (regarding) complaintFields.regarding = regarding;
    if (nature) complaintFields.nature = nature;
    if (complaintdetails) complaintFields.complaintdetails = complaintdetails;
    if (registrationnumber)
      complaintFields.registrationnumber = registrationnumber;

    console.log(complaintFields);

    try {
      //creating complaint
      complaint = new Complaint(complaintFields);
      await complaint.save();
      res.json(complaint);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route   GET api/complaint
// @desc    Show all complaint for uni and hec portal
// @access  Public
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });

    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/complaint/:id
// @desc    Get  all complaints by a user
// @access  Private
router.get("/user", auth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id });

    if (complaints.length === 0) {
      return res.status(404).json({ msg: "No Complaints Found" });
    }

    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "No Complaints Found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/complaint/single/:id
// @desc    Get a complaint by complaint Id
// @access  Private
router.get("/single/:id", auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res
        .status(404)
        .json({ msg: "No complaint registered with this Id" });
    }

    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res
        .status(404)
        .json({ msg: "No complaint registered with this Id" });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
