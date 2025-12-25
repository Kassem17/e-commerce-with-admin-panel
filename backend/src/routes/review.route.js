import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createReview, deleteReview } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", protectRoute, createReview);

// todo: implement this functionality in the frontend
router.delete("/:reviewId", protectRoute, deleteReview);

export default router;
