import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "../controllers/categoryContollers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

router.get("/all-category", getAllCategoryController);

router.delete(
  "/delete-category/:cid",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

export default router;
