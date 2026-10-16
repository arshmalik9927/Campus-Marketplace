import express from "express";
import passport from "passport";

import {
    renderSignupForm,
    signup,
    renderLoginForm,
    login,
    logout
} from "../controllers/user.js";

import {
    isLoggedIn,
    saveRedirectUrl
} from "../middleware.js";

const router = express.Router();


// ========================================
// Signup
// ========================================

router.get(
    "/signup",
    renderSignupForm
);

router.post(
    "/signup",
    signup
);


// ========================================
// Login
// ========================================

router.get(
    "/login",
    renderLoginForm
);

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    login
);


// ========================================
// Profile
// ========================================

router.get(
    "/profile",
    isLoggedIn,
    (req, res) => {
        res.render("users/profile", {
            title: "My Profile — CampusMarket"
        });
    }
);


// ========================================
// Logout
// ========================================

router.get(
    "/logout",
    logout
);


export default router;