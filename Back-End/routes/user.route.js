import express from "express";
import { login, logout, register, updateProfile, getCurrentUser, adminLogin } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleupload } from "../middlewares/mutler.js";

import { googleSignup } from "../controllers/user.controller.js";

const router =express.Router();

router.route("/register").post(singleupload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleupload, updateProfile);
router.route("/me").get(isAuthenticated, getCurrentUser);

router.post('/google-signup', googleSignup);

// Admin login route
router.route("/admin/login").post(adminLogin);

export default router;