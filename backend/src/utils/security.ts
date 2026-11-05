import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "CHANGE_ME";

export function signJwt(payload: object) {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
}