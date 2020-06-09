const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  cnic: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  institute: {
    type: String,
    required: true,
  },
  campus: {
    type: String,
  },
  registrationNumber: {
    type: String,
  },
  degreeProgram: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Request = mongoose.model('request', RequestSchema);
