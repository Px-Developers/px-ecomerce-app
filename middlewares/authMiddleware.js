import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      res.status(401).send({
        success: false,
        message: "Unauthorized access to admin pages",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("Err isAdmin", error.message);
  }
};
