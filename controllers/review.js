import Product from "../models/product.js";
import Review from "../models/review.js";

export const createReview = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        req.flash("error", "Product not found!");
        return res.redirect("/products");
    }

    const newReview = new Review(req.body.review);

    // Logged-in user becomes review author
    newReview.author = req.user._id;

    // Add review to product
    product.reviews.push(newReview);

    await newReview.save();
    await product.save();

    req.flash("success", "Review added successfully!");

    res.redirect(`/products/${id}`);
};

export const destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        req.flash("error", "Product not found!");
        return res.redirect("/products");
    }

    // Remove review reference from product
    product.reviews.pull(reviewId);
    await product.save();

    // Delete review document
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");

    res.redirect(`/products/${id}`);
};