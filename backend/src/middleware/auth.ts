import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "CHANGE_ME";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header =
    req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      error: "Не авторизован"
    });
  }

  const token =
    header.replace("Bearer ", "");

  try {

    const payload = jwt.verify(
      token,
      JWT_SECRET
    ) as {
      uid: string;
      email: string;
    };

    req.user = payload;

    next();

  } catch {

    return res.status(401).json({
      error: "Неверный токен"
    });

  }
}