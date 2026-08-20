import jwt from "jsonwebtoken";

export function createAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    },
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
