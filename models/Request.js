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
    required: true,
  },
  fathername: {
    type: String,
  },
  cnic: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  campus: {
    type: String,
    required: true,
  },
  registrationnumber: {
    type: String,
    required: true,
  },
  degreeprogram: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
  },
  requestdescription: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Request = mongoose.model('request', RequestSchema);
