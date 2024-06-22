import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

// token based protected routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/test", requireSignIn, isAdmin, testController);

export default router;
