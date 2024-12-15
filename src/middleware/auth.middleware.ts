import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT and check roles
export const roleBasedMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    // Check if the token exists in the request header
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    try {
      // Verify the token
      const decoded: any = jwt.verify(token, JWT_SECRET);

      // Check if the role is allowed
      if (!allowedRoles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
  };
};
