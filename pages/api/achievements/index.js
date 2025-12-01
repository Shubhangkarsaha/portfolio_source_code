import { connectToDB } from "../../../lib/mongodb";
import { verifyToken } from "../../../lib/verifyToken";
import Achievement from "../../../models/Achievement";

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === "GET") {
    const data = await Achievement.find({});
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    if (!verifyToken(req, res)) return;
    const doc = await Achievement.create(req.body);
    return res.status(201).json(doc);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

