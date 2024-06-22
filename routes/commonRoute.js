import express from "express";

const router = express.Router();

router.post("", getByPriceController);

export default router;
