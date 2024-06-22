import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import formidable from "formidable";
export async function createProductController(req, res) {
  try {
    console.log("Create Product is called");
    const { name, description, price, category, shipping } = req.fields;
    const { photo } = req.files;
    console.log("Product Data ", name, description, price, category, shipping);

    console.log("Received fields:", req.fields);
    console.log("Received files:", req.files);

    if (!name || !price || !category) {
      console.error("Validation failed: Missing required fields.");
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required.",
      });
    }

    const product = new productModel({
      name: name[0], // Convert array to string
      description: description[0],
      price: parseFloat(price[0]),
      category: category[0], // Use correct key and convert array to string
      shipping: shipping ? shipping[0] === "true" : false,
      slug: slugify(name[0]),
    });

    if (photo) {
      const ext = path.extname(photo[0].originalFilename).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".ico"].includes(ext)) {
        console.error("Invalid photo format.");
        return res.status(400).json({
          success: false,
          message: "Invalid photo format. Only JPG, JPEG, and PNG are allowed.",
        });
      }

      if (photo[0].size > 5 * 1024 * 1024) {
        console.error("Photo size exceeds limit of 5MB.");
        return res.status(400).json({
          success: false,
          message: "Photo size exceeds limit of 5MB.",
        });
      }

      product.photo.data = fs.readFileSync(photo[0].filepath);
      product.photo.contentType = photo[0].mimetype;
    }

    await product.save();
    console.log("Product saved successfully.");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.messageproductModel.find({}),
    });
  }
}

export async function getAllProductsController(req, res) {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Fetched limited products",
      products,
    });
  } catch (error) {
    res.status(501).send({
      success: false,
      message: "could not fetch limited products",
      error,
    });
  }
}

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  console.log("Delete product by id called");
  const pid = req.params.pid;
  try {
    const response = await productModel.findByIdAndDelete(pid);
    if (!response) {
      res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.status(201).send({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Catch Block called",
    });
  }
};

export const updateProduct = async (req, res) => {
  const pid = req.params.pid;
  const { name, description, price, category, shipping } = req.fields;
  const { photo } = req.files;

  try {
    let updatedFields = {
      name,
      description,
      price,
      category,
      shipping,
    };
    if (Array.isArray(name)) {
      updatedFields.name = name[0];
    } else {
      updatedFields.name = name;
    }
    if (Array.isArray(description)) {
      updatedFields.description = description[0];
    } else {
      updatedFields.description = description;
    }
    if (Array.isArray(category)) {
      updatedFields.category = category[0];
    } else {
      updatedFields.category = category;
    }
    if (Array.isArray(price)) {
      updatedFields.price = price[0];
    } else {
      updatedFields.price = price;
    }
    if (photo) {
      const ext = path.extname(photo[0].originalFilename).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".ico"].includes(ext)) {
        console.error("Invalid photo format.");
        return res.status(400).json({
          success: false,
          message: "Invalid photo format. Only JPG, JPEG, and PNG are allowed.",
        });
      }

      if (photo[0].size > 5 * 1024 * 1024) {
        console.error("Photo size exceeds limit of 5MB.");
        return res.status(400).json({
          success: false,
          message: "Photo size exceeds limit of 5MB.",
        });
      }

      // Read the photo file and update the product
      updatedFields.photo = {
        data: fs.readFileSync(photo[0].filepath), // Read file content synchronously
        contentType: photo[0].mimetype,
      };
    }
    console.log(updatedFields);
    // Update product in database
    const response = await productModel.findByIdAndUpdate(pid, updatedFields);

    if (response) {
      console.log("Product updated");
      res.status(201).json({
        success: true,
        message: "Product updated successfully",
      });
    } else {
      console.log("Product not updated");
      res.status(500).json({
        success: false,
        message: "Product did not update successfully",
      });
    }
  } catch (error) {
    console.error("Catch called:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};
