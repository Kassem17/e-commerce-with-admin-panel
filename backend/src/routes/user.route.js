import express from "express";
import {
  addAddress,
  addToWishlist,
  deleteAddress,
  getAddresses,
  getWishlist,
  removeFromWishlist,
  updateAddress,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

// address routes
router.post("/addresses", addAddress);
router.get("/addresses", getAddresses);
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);

// wishlist routes
router.post("/wishlist", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);
router.get("/wishlist", getWishlist);

export default router;

// when we want to remove something we send it's id in the params
// addition => send the id in the body
