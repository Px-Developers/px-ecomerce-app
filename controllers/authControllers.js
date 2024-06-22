import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const registerController = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name) {
    return res.send({ error: "Name is required" });
  }
  if (!email) {
    return res.send({ error: "Email is required" });
  }
  if (!password) {
    return res.send({ error: "Password is required" });
  }
  if (!phone) {
    return res.send({ error: "Phone is required" });
  }
  if (!address) {
    return res.send({ error: "Address is required" });
  }
  // check if existing
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(200).send({
      success: false,
      message: "User already present",
      user: existingUser.name,
    });
  }

  // register new user
  const hashed = await hashPassword(password);
  const user = await new userModel({
    name,
    email,
    password: hashed,
    phone,
    address,
  }).save();

  res.status(201).send({
    success: true,
    message: "User Register Successfull",
    user,
  });
};

// LOGIN

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("login controller");
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({ success: false, message: "User not found" });
    }
    const isPass = await comparePassword(password, user.password);
    console.log("isPass", isPass);
    if (!isPass) {
      res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(201).send({
      success: true,
      message: "User Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log("Error in SIgning in ", error.bgRed);
  }
};

// protected routes token based
export const testController = (req, res) => {
  res.send("Protected Routes");
};
