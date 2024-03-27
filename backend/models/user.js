const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },

  { timeseries: true }
);

module.exports = mongoose.model("User", userSchema);
