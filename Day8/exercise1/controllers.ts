import { Request, Response, NextFunction } from "express";
import { add, subtract, multiply, divide, modulus } from "./handlers";

// Helper function to extract numbers from request
const getNumbers = (req: Request): { a: number; b: number } => {
  const a = Number(req.params.a) || Number(req.query.a) || Number(req.body.a);
  const b = Number(req.params.b) || Number(req.query.b) || Number(req.body.b);

  if (isNaN(a) || isNaN(b)) {
    throw new Error("Invalid input: 'a' and 'b' must be numbers.");
  }

  return { a, b };
};

// Addition Controller
export const addition = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { a, b } = getNumbers(req);
    res.json({ result: add(a, b) });
  } catch (error) {
    next(error); // Pass the error to the errorHandler middleware
  }
};

// Subtraction Controller
export const subtraction = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { a, b } = getNumbers(req);
    res.json({ result: subtract(a, b) });
  } catch (error) {
    next(error);
  }
};

// Multiplication Controller
export const multiplication = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { a, b } = getNumbers(req);
    res.json({ result: multiply(a, b) });
  } catch (error) {
    next(error);
  }
};

// Division Controller
export const division = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { a, b } = getNumbers(req);
    res.json({ result: divide(a, b) });
  } catch (error) {
    next(error);
  }
};

// Modulus Controller
export const modulusOperation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { a, b } = getNumbers(req);
    res.json({ result: modulus(a, b) });
  } catch (error) {
    next(error);
  }
};
