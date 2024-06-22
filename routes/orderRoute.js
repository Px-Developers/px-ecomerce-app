import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createOrderController,
  deleteOrderController,
  getAdminAllOrderController,
  getAllOrderController,
  updateStatusController,
} from "../controllers/orderController.js";
const router = express.Router();

router.post("/create-order", requireSignIn, createOrderController);
router.post("/get-order", requireSignIn, getAllOrderController);
router.post("/get-all-order", requireSignIn, getAdminAllOrderController);
router.delete("/delete-order", requireSignIn, deleteOrderController);
router.post("/order-status", requireSignIn, updateStatusController);

export default router;
