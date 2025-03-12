import express from "express";
import { addition, subtraction, multiplication, division, modulusOperation } from "./controllers";

const router = express.Router();

// addition routes
router.get("/addition/:a?/:b?", addition); // Supports path parameters
router.get("/addition", addition); // Supports query parameters
router.post("/addition", addition); // Supports request body

// subtraction routes
router.get("/subtraction/:a?/:b?", subtraction);
router.get("/subtraction", subtraction);
router.post("/subtraction", subtraction);

// multiplication routes
router.get("/multiplication/:a?/:b?", multiplication);
router.get("/multiplication", multiplication);
router.post("/multiplication", multiplication);

// division routes
router.get("/division/:a?/:b?", division);
router.get("/division", division);
router.post("/division", division);

// modulus routes
router.get("/modulus/:a?/:b?", modulusOperation);
router.get("/modulus", modulusOperation);
router.post("/modulus", modulusOperation);

export default router;
