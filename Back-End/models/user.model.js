import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: function() {
      return !this.googleId; // required only if googleId is NOT present
    }
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // required only if googleId is NOT present
    }
  },
  googleId: {   // add googleId field
    type: String,
    unique: true,
    sparse: true,  // allows multiple docs without googleId
  },
  role: {
    type: String,
    enum: ["client", "freelancer"],
    required: true
  },
  profilePhoto: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
