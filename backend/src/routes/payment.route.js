import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createPaymentIntent,
  handleWebhook,
} from "../controllers/payment.controller.js";

const router = express.Router();

// payment req => payment intent

router.post("/create-intent", protectRoute, createPaymentIntent);

// No auth needed - stripe validates via signature

router.post("/webhook", handleWebhook);

export default router;
