
import express from "express";

import wrapAsync from "../utils/wrapAsync.js";

import {
    isLoggedIn,
    isReviewAuthor,
    validateReview
} from "../middleware.js";

import {
    createReview,
    destroyReview
} from "../controllers/review.js";

const router = express.Router({ mergeParams: true });


// ===============================
// Create Review
// ===============================

router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(createReview)
);


// ===============================
// Delete Review
// ===============================

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(destroyReview)
);


export default router;

