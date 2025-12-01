import jwt from "jsonwebtoken";
import { connectToDB } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Ensure DB connection is established (important!)
  try {
    await connectToDB();
  } catch (error) {
    console.error("DB connection error:", error);
    return res.status(500).json({ message: "Database connection failed" });
  }

  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
}
