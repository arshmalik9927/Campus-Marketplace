
import User from "../models/User.js";

// Render Signup Form
export const renderSignupForm = (req, res) => {
    res.render("users/signup");
};

// Signup
export const signup = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        const newUser = new User({
            username,
            email,
            role: role === "seller" ? "seller" : "buyer"
        });

        const registeredUser = await User.register(
            newUser,
            password
        );

        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash(
                "success",
                `Welcome ${registeredUser.username}!`
            );

            res.redirect("/products");
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

// Render Login Form
export const renderLoginForm = (req, res) => {
    res.render("users/login");
};

// Login
export const login = (req, res) => {
    req.flash(
        "success",
        `Welcome back! 👌 ${req.user.username}`
    );

    const redirectUrl = res.locals.redirectUrl || "/products";

    res.redirect(redirectUrl);
};

// Logout
export const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You logged out successfully!");

        res.redirect("/products");
    });
};

