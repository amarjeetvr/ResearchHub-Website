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
  },
  // Bank Account Details (for Researchers only)
  bankAccount: {
    accountHolderName: {
      type: String,
      default: ""
    },
    bankName: {
      type: String,
      default: ""
    },
    accountNumber: {
      type: String,
      default: ""
    },
    ifscCode: {
      type: String,
      default: ""
    },
    accountType: {
      type: String,
      enum: ["", "savings", "current"],
      default: ""
    },
    upiId: {
      type: String,
      default: ""
    }
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
