import categorySchema from "../models/categoryModel.js";

export async function createCategoryController(req, res) {
  const { name } = req.body; // Destructure `name` from `req.body`
  console.log("Received category name:", name);

  try {
    // Validate `name` here if needed
    if (!name || typeof name !== "string") {
      return res.status(400).send({
        success: false,
        message: "Category name is required and must be a string.",
      });
    }

    // Check if category name already exists
    const isAlready = await categorySchema.findOne({ name });
    if (isAlready) {
      return res.status(200).send({
        success: false,
        message: "Category name already exists.",
      });
    }

    // Create new category object and save to database
    const newCategory = new categorySchema({ name });
    const response = await newCategory.save();

    if (response) {
      res.status(200).send({
        success: true,
        message: "Category inserted",
        category: response,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Category not inserted",
      });
    }
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
}

export async function getAllCategoryController(req, res) {
  try {
    const categories = await categorySchema.find({});
    if (categories) {
      res.status(200).send({
        success: true,
        message: "All categories fetched",
        categories,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).send({
      success: false,
      message: "Failed to fetch categories",
      error: err.message,
    });
  }
}

export async function deleteCategoryController(req, res) {
  try {
    const cid = req.params.cid;
    console.log(cid);
    const response = await categorySchema.findByIdAndDelete(cid);
    if (response) {
      res.status(201).send({
        success: true,
        message: "Category Deleted Successfull",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Categorey not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Catch Called",
    });
  }
}

export const updateCategoryController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body; // Ensure the body has 'name', not 'newName'

  try {
    const category = await categorySchema.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
