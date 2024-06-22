import express from "express";
import formidable from "formidable";
import {
  createProductController,
  deleteProduct,
  getAllProductsController,
  productPhotoController,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-product",
  (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(400).json({
          success: false,
          message: "Form parsing failed",
          error: err.message,
        });
      }

      req.fields = fields;
      req.files = files;
      console.log("Form parsed successfully:", fields, files);

      next();
    });
  },
  createProductController
);

export default router;

// Get Limited Products
router.get("/limited-products", getAllProductsController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/product-delete/:pid", requireSignIn, isAdmin, deleteProduct);

router.put(
  "/product-update/:pid",
  requireSignIn,
  isAdmin,
  (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(400).json({
          success: false,
          message: "Form parsing failed",
          error: err.message,
        });
      }

      req.fields = fields;
      req.files = files;
      console.log("Form parsed successfully:", fields, files);

      next();
    });
  },
  updateProduct
);
