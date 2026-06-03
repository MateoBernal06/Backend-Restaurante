import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno");
}

const createToken = (id: string): string => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "8h",
  });
  return token;
};

export { createToken };
