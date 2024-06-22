import userModel from "../models/userModel.js";

export const addCartController = async (req, res) => {
  const { email, pid, name, description, price } = req.body;

  if (!pid || !name || !description || !price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newCartItem = {
      pid, // Make sure pid is a valid ObjectId if you are referencing another collection
      name,
      description,
      price,
    };

    user.cart.push(newCartItem); // Add new item to cart
    await user.save({ new: true, runValidators: true }); // Save the updated user document

    res
      .status(200)
      .json({ success: true, message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getCartController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User Id does not found",
      });
    }

    res.status(201).send({
      success: true,
      message: "Fetched All Cart",
      cart: user.cart,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "get cart catch called",
      error,
    });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const { email, pid } = req.query;

    // Find the user by email
    const user = await userModel.findOne({ email });
    console.log(email);
    console.log(user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check if the product exists in the cart
    const productIndex = user.cart.findIndex((item) => item.pid === pid);
    console.log(productIndex);
    if (productIndex === -1) {
      return res.status(404).send({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Remove the product from the cart array
    user.cart.splice(productIndex, 1);

    // Save the updated user document
    await user.save();

    // Send success response
    res.status(200).send({
      success: true,
      message: "Product removed from cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error deleting from cart:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the product from the cart",
      error,
    });
  }
};
