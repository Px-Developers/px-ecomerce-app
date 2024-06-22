import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

export const createOrderController = async (req, res) => {
  const { email, pid } = req.body;
  console.log(email, pid);

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found, please login first",
      });
    }

    // Find the product by ID
    const product = await productModel.findById(pid);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    const isAlreadyUser = await orderModel.findOne({ email });
    if (isAlreadyUser) {
      isAlreadyUser.orders.push({
        pid: pid,
        productName: product.name,
        productPrice: product.price,
        orderDate: new Date(),
      });
      res.status(201).send({
        success: true,
        message: "Order placed successfully",
        order: [
          {
            pid: pid,
            productName: product.name,
            productPrice: product.price,
            orderDate: new Date(),
          },
        ],
      });
    } else {
      const newOrder = new orderModel({
        email: email,
        orders: [
          {
            pid: pid,
            productName: product.name,
            productPrice: product.price,
            orderDate: new Date(),
          },
        ],
      });
      console.log("user after order", user);
      await newOrder.save();
      res.status(201).send({
        success: true,
        message: "Order placed successfully",
        order: newOrder,
      });
    }
    // Create a new order instance

    // Send success response
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while placing the order",
      error,
    });
  }
};

export const getAllOrderController = async (req, res) => {
  const { email } = req.body;

  try {
    // Find orders by email
    const userOrders = await orderModel.findOne({ email });
    if (!userOrders) {
      return res.status(404).send({
        success: false,
        message: "No orders found for this user",
      });
    }
    // Send success response with the orders
    res.status(200).send({
      success: true,
      message: "Fetched all orders successfully",
      orders: userOrders.orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while fetching the orders",
      error,
    });
  }
};

export const getAdminAllOrderController = async (req, res) => {
  // const { email } = req.body;

  try {
    // Find orders by email
    const userOrders = await orderModel.find({});
    if (!userOrders) {
      return res.status(404).send({
        success: false,
        message: "No orders found",
      });
    }
    // Send success response with the orders
    res.status(200).send({
      success: true,
      message: "Fetched all orders successfully",
      orders: userOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while fetching the orders",
      error,
    });
  }
};

export const deleteOrderController = async (req, res) => {
  const { email, pid } = req.query;
  console.log(email, pid);
  try {
    // Find the order record by email
    const userOrders = await orderModel.findOne({ email });
    if (!userOrders) {
      return res.status(404).send({
        success: false,
        message: "No orders found for this user",
      });
    }

    // Ensure userOrders.orders is an array
    if (!Array.isArray(userOrders.orders)) {
      return res.status(500).send({
        success: false,
        message: "Unexpected data format for user orders",
      });
    }

    console.log(userOrders);
    // Find the index of the order to delete
    const orderIndex = userOrders.orders.findIndex(
      (order) => order.pid && order.pid.toString() === pid
    );
    console.log(orderIndex);
    if (orderIndex === -1) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    // Remove the order from the array
    userOrders.orders.splice(orderIndex, 1);

    // Save the updated order record
    await userOrders.save();

    res.status(200).send({
      success: true,
      message: "Order deleted successfully",
      orders: userOrders.orders, // Return the updated list of orders
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the order",
      error,
    });
  }
};

export const updateStatusController = async (req, res) => {
  const { uid, pid, value } = req.body;

  try {
    // Find the order by uid and product inside orders array by pid
    const order = await orderModel.findOneAndUpdate(
      { _id: uid, "orders.pid": pid },
      { $set: { "orders.$.shipping": value } },
      { new: true } // To return the updated document
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Order status updated successfully",
        order,
      });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
