const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group"
  },
  description: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Post = mongoose.model("post", PostSchema);
