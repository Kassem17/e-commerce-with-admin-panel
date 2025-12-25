import express from "express";
import {
  createProduct,
  getAllCustomers,
  getAllOrders,
  getAllProducts,
  getDashboardStats,
  updateOrderStatus,
  updateProduct,
  deleteProduct,
} from "../controllers/admin.controller.js";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.get("/orders", getAllOrders);
// optimization - don't repeat the same code
router.use(protectRoute, adminOnly);

// products routes
router.post("/products", upload.array("images", 3), createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", upload.array("images", 3), updateProduct);
router.delete("/products/:id", deleteProduct);

// orders routes

router.patch("/orders/:orderId/status", updateOrderStatus); // pending -> shipped and so on

//  customers routes
router.get("/customers", getAllCustomers);

router.get("/stats", getDashboardStats);

// PUT: update the entire resource
// PATCH : when we update a specific part of resource

export default router;

// upload.array("images", 3) : each product have at maximum 3 images and when sending the images from the frontend they should be under the key = images
