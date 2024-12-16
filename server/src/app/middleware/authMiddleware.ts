import { Request, Response, NextFunction } from "express";
import { auth } from "../../lib/auth.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["better-auth.session_token"];
  if (!token) {
    return res.status(401).send({ error: "Not authenticated" });
  }

  try {
    console.log("token", token);

    const session = auth.api.getSession(token);

    req.body.user = session;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authenticated" });
  }
};

module.exports = authMiddleware;
