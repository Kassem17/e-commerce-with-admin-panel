import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createOrder, getUserOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protectRoute, createOrder);
router.get("/", protectRoute, getUserOrders);

export default router;
