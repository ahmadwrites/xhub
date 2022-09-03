import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  let token = null;

  if (req.cookies["access_token"]) {
    // check the new style cookie first
    token = req.cookies["access_token"];
  } else if (req.cookies["access_token-legacy"]) {
    // otherwise fall back to the legacy cookie
    token = req.cookies["access_token-legacy"];
  }

  if (!token) return next(createError(404, "Token does not exist"));

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(createError(403, "Invalid token."));
    req.user = user;
    next();
  });
};
