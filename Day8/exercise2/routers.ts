import express from "express";
import { getNumber, getNumbers, addNumber, deleteNumber, putNumber } from "./controllers";

const router = express.Router();

// routes
router.get("/", getNumbers);
router.get("/:index", getNumber);
router.post("/:n", addNumber);
router.delete("/:n", deleteNumber);
router.put("/:index/:n", putNumber);

export default router;
