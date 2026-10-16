import express from "express";

import wrapAsync from "../utils/wrapAsync.js";

import {
    isLoggedIn
} from "../middleware.js";

import {
    showCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart
} from "../controllers/cart.js";

const router = express.Router();


// ===============================
// Show Cart
// ===============================

router.get(
    "/",
    isLoggedIn,
    wrapAsync(showCart)
);


// ===============================
// Add Product To Cart
// ===============================

router.post(
    "/:productId",
    isLoggedIn,
    wrapAsync(addToCart)
);


// ===============================
// Update Cart Quantity
// ===============================

router.put(
    "/:productId",
    isLoggedIn,
    wrapAsync(updateCart)
);


// ===============================
// Remove Product From Cart
// ===============================

router.delete(
    "/:productId",
    isLoggedIn,
    wrapAsync(removeFromCart)
);


// ===============================
// Clear Cart
// ===============================

router.delete(
    "/",
    isLoggedIn,
    wrapAsync(clearCart)
);


export default router;