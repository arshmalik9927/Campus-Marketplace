import Cart from "../models/Cart.js";
import Product from "../models/product.js";

// ======================================
// Show Cart
// ======================================

export const showCart = async (req, res) => {
    let cart = await Cart.findOne({
        user: req.user._id
    }).populate("items.product");

    // If cart doesn't exist, create an empty cart
    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            items: []
        });
    }

    res.render("cart/index", {
        cart
    });
};


// ======================================
// Add Product To Cart
// ======================================

export const addToCart = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        req.flash("error", "Product not found!");
        return res.redirect("/products");
    }

    // Seller cannot add their own product
    if (
        product.seller &&
        product.seller.equals(req.user._id)
    ) {
        req.flash(
            "error",
            "You cannot add your own product to cart!"
        );

        return res.redirect(`/products/${productId}`);
    }

    let cart = await Cart.findOne({
        user: req.user._id
    });

    // Create cart if it doesn't exist
    if (!cart) {
        cart = new Cart({
            user: req.user._id,
            items: []
        });
    }

    // Check whether product already exists in cart
    const existingItem = cart.items.find(
        (item) => item.product.equals(productId)
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            product: productId,
            quantity: 1
        });
    }

    await cart.save();

    req.flash(
        "success",
        "Product added to cart!"
    );

    res.redirect("/cart");
};


// ======================================
// Update Cart Quantity
// ======================================

export const updateCart = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    const newQuantity = Number(quantity);

    if (
        !Number.isInteger(newQuantity) ||
        newQuantity < 1
    ) {
        req.flash(
            "error",
            "Quantity must be at least 1!"
        );

        return res.redirect("/cart");
    }

    const cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {
        req.flash("error", "Cart not found!");
        return res.redirect("/cart");
    }

    const item = cart.items.find(
        (item) => item.product.equals(productId)
    );

    if (!item) {
        req.flash(
            "error",
            "Product is not in your cart!"
        );

        return res.redirect("/cart");
    }

    item.quantity = newQuantity;

    await cart.save();

    req.flash(
        "success",
        "Cart updated successfully!"
    );

    res.redirect("/cart");
};


// ======================================
// Remove Product From Cart
// ======================================

export const removeFromCart = async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {
        req.flash("error", "Cart not found!");
        return res.redirect("/cart");
    }

    cart.items = cart.items.filter(
        (item) => !item.product.equals(productId)
    );

    await cart.save();

    req.flash(
        "success",
        "Product removed from cart!"
    );

    res.redirect("/cart");
};


// ======================================
// Clear Cart
// ======================================

export const clearCart = async (req, res) => {
    const cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {
        return res.redirect("/cart");
    }

    cart.items = [];

    await cart.save();

    req.flash(
        "success",
        "Cart cleared successfully!"
    );

    res.redirect("/cart");
};