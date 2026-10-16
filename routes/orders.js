import express from "express";
import wrapAsync from "../utils/wrapAsync.js";

import {
    isLoggedIn,
    isSeller
} from "../middleware.js";

import {
    renderCheckout,
    createOrder,
    showOrder,
    showMyOrders,
    showSellerOrders,
    updateOrderStatus
} from "../controllers/order.js";

const router = express.Router();


// =========================
// BUYER ROUTES
// =========================

// Checkout page
router.get(
    "/checkout",
    isLoggedIn,
    wrapAsync(renderCheckout)
);


// Create order
router.post(
    "/",
    isLoggedIn,
    wrapAsync(createOrder)
);


// My orders
router.get(
    "/",
    isLoggedIn,
    wrapAsync(showMyOrders)
);


// =========================
// SELLER ROUTES
// =========================

// Seller orders
router.get(
    "/seller",
    isLoggedIn,
    isSeller,
    wrapAsync(showSellerOrders)
);
router.put(
    "/seller/:id/status",
    isLoggedIn,
    isSeller,
    wrapAsync(updateOrderStatus)
);


// =========================
// ORDER DETAILS
// =========================

router.get(
    "/:id",
    isLoggedIn,
    wrapAsync(showOrder)
);


export default router;