import express from "express";
import multer from "multer";

import wrapAsync from "../utils/wrapAsync.js";

import {
    isLoggedIn,
    isSeller,
    isSellerOfProduct,
    validateProduct
} from "../middleware.js";

import {
    index,
    renderNewForm,
    showProduct,
    createProduct,
    editProduct,
    updateProduct,
    destroyProduct,
    searchProduct,
    filterByCategory
} from "../controllers/product.js";

import { storage } from "../utils/cloudinary.js";

const router = express.Router();

const upload = multer({ storage });


// ===============================
// All Products + Create Product
// ===============================

router
    .route("/")
    .get(
        wrapAsync(index)
    )
    .post(
        isLoggedIn,
        isSeller,
        upload.single("product[image]"),
        validateProduct,
        wrapAsync(createProduct)
    );


// ===============================
// New Product Form
// ===============================

router.get(
    "/new",
    isLoggedIn,
    isSeller,
    renderNewForm
);


// ===============================
// Search Products
// ===============================

router.get(
    "/search",
    wrapAsync(searchProduct)
);


// ===============================
// Filter By Category
// ===============================

router.get(
    "/category/:category",
    wrapAsync(filterByCategory)
);


// ===============================
// Product Details
// ===============================

router
    .route("/:id")
    .get(
        wrapAsync(showProduct)
    )
    .put(
        isLoggedIn,
        isSeller,
        isSellerOfProduct,
        upload.single("product[image]"),
        validateProduct,
        wrapAsync(updateProduct)
    )
    .delete(
        isLoggedIn,
        isSeller,
        isSellerOfProduct,
        wrapAsync(destroyProduct)
    );


// ===============================
// Edit Product
// ===============================

router.get(
    "/:id/edit",
    isLoggedIn,
    isSeller,
    isSellerOfProduct,
    wrapAsync(editProduct)
);


export default router;