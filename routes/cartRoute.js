import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  addCartController,
  deleteCartController,
  getCartController,
} from "../controllers/cartControllers.js";
const router = express.Router();

router.post("/add-cart", requireSignIn, addCartController);

router.post("/get-cart", requireSignIn, getCartController);

router.delete("/delete-cart", requireSignIn, deleteCartController);

export default router;
