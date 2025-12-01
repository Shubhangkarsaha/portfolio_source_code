import jwt from "jsonwebtoken";

export function verifyToken(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  try {
    jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    return true;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

