import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "CHANGE_ME";

export interface AdminRequest extends Request {
  admin?: {
    aid: string;
    email: string;
    role: string;
  };
}

export function adminAuth(
  req: AdminRequest,
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
      aid: string;
      email: string;
      role: string;
    };

    if (payload.role !== "admin") {
      return res.status(403).json({
        error: "Нет доступа"
      });
    }

    req.admin = payload;

    next();

  } catch {

    return res.status(401).json({
      error: "Неверный токен"
    });

  }

}