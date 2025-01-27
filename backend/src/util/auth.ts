import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model";

type UserToken = {
  _id: string;
};

export type UserContext = {
  _id: string;
  name: string;
  email: string;
} | null;

export interface AuthRequest extends Request {
    user?: {
        _id: string;
        name: string;
        email: string;
    } | null;
}

export const generateToken = async (user: UserToken): Promise<string> => {
  if (!process.env.JWT_SECRET) {
    return Promise.reject("JWT secret not set");
  }
  return Promise.resolve(
    jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" })
  );
};

export const auth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.cookies?.token;

    if (!token) {
      req.user = null; // Allow the request to pass without a user
      return next();
    }
    try {
      if (!req.cookies || !req.cookies.token) {
        res.status(401).send({ error: "Unauthorized" });
        return;
      }
      if (!process.env.JWT_SECRET) {
        res.status(500).send({ error: "JWT secret not set" });
        return;
      }
  
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET) as { _id: string };
      if (!decoded._id) {
        res.status(401).send({ error: "Unauthorized" });
        return;
      }
  
      const user = await User.findById(decoded._id, "-password -__v");
      if (!user) {
        res.status(401).send({ error: "Unauthorized" });
        return;
      }
  
      req.user = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
      };
  
      next(); // Call next() to pass control to the next middleware or route handler
    } catch (err) {
      res.status(401).send({ error: "Unauthorized" });
      return
    }
  };

// Function to check if the user can delete a car post
export const canDeletePost = (req: AuthRequest, postOwnerId: string): boolean => {
    return !!req.user && req.user._id === postOwnerId;
};
