const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ComplaintSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  reference: {
    type: String
  },
  complainantname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: Number
  },
  registrationnumber: {
    type: String
  },
  nature: {
    type: String,
    required: true
  },
  regarding: {
    type: String,
    required: true
  },
  complaintdetails: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Complaint = mongoose.model("complaint", ComplaintSchema);
