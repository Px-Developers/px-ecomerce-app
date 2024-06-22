import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    shipping: {
      type: Number,
      default: 0,
    },
  },
  { _id: false } // Prevent _id field in sub-documents
);

const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    orders: {
      type: [orderItemSchema], // Embedding the order items
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
