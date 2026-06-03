import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      msg: "Token no proporcionado",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token no proporcionado",
    });
  }

  try {
    const {id} = jwt.verify(token, JWT_SECRET) as unknown as { id: string };
    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: `Token invalido`,
    });
  }
};
