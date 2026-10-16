
import Product from "./models/product.js";
import Review from "./models/review.js";
import { productSchema, reviewSchema } from "./schema.js";
import ExpressError from "./utils/ExpressError.js";

// Check whether user is logged in
export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;

        req.flash("error", "You must be logged in first!");

        return res.redirect("/login");
    }

    next();
};
// Check whether logged-in user has a seller account
export const isSeller = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Please login first!");
        return res.redirect("/login");
    }

    if (req.user.role !== "seller") {
        req.flash("error", "Only seller accounts can sell products!");
        return res.redirect("/products");
    }

    next();
};

// Save redirect URL
export const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    }

    next();
};

// Check whether logged-in user owns the product
export const isSellerOfProduct = async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        req.flash("error", "Product not found!");
        return res.redirect("/products");
    }

    if (!product.seller.equals(req.user._id)) {
        req.flash(
            "error",
            "You are not the seller of this product!"
        );

        return res.redirect(`/products/${id}`);
    }

    next();
};

// Validate product
export const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);

    if (error) {
        const errMsg = error.details
            .map((el) => el.message)
            .join(", ");

        throw new ExpressError(400, errMsg);
    }

    next();
};

// Check whether user is the review author
export const isReviewAuthor = async (req, res, next) => {
    const { reviewId, id } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/products/${id}`);
    }

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/products/${id}`);
    }

    next();
};

// Validate review
export const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const errMsg = error.details
            .map((el) => el.message)
            .join(", ");

        throw new ExpressError(400, errMsg);
    }

    next();
};

