import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import { cloudinary } from "../utils/cloudinary.js";
import { OAuth2Client } from 'google-auth-library';

const ALLOWED_ROLES = ["client", "freelancer"];

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        if (!ALLOWED_ROLES.includes(role)) {
            return res.status(400).json({
                message: "Invalid role. Must be 'client' or 'freelancer'",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }

        let profilePhotoUrl = "";
        
        // Handle optional file upload
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profilePhoto: profilePhotoUrl
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Return user info excluding password
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profilePhoto: user.profilePhoto,
    };

    return res.status(200).json({
      message: `Welcome back, ${user.fullname}`,
      user: userData,
      token,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
}
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { fullname, email, phoneNumber } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Handle optional file upload for profile photo
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto",
        type: "upload",
        public_id: `profile_${userId}`,
        access_mode: "public",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      if (cloudResponse) {
        user.profilePhoto = cloudResponse.secure_url;
      }
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profilePhoto: user.profilePhoto,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


export const googleSignup = async (req, res) => {
  const { token, role } = req.body;

  try {
    // Validate role, default to "client"
    const userRole = ALLOWED_ROLES.includes(role) ? role : "client";

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, sub: googleId, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullname: name,
        email,
        googleId,
        phoneNumber: "",
        password: "",
        role: userRole,
        profilePhoto: picture
      });
    }

    // Generate JWT token with consistent key (userId)
    const appToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // Return user info excluding password
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profilePhoto: user.profilePhoto,
    };

    // Set cookie and send response
    res
      .status(200)
      .cookie("token", appToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        token: appToken,
        user: userData,
        message: "Google signup successful",
      });
  } catch (error) {
    console.error("Google Signup Error:", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired Google token" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.id; // From isAuthenticated middleware

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    return res.status(200).json({
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profilePhoto: user.profilePhoto,
      },
      success: true
    });
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

