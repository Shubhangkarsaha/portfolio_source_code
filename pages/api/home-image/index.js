import { connectToDB } from "../../../lib/mongodb";
import { verifyToken } from "../../../lib/verifyToken";
import HomeImage from "../../../models/HomeImage";

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === "GET") {
    const image = await HomeImage.findOne({}).sort({ createdAt: -1 });
    return res.status(200).json(image || null);
  }

  if (req.method === "POST") {
    if (!verifyToken(req, res)) return;
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: "Image URL is required" });
    }
    const doc = await HomeImage.create({ image });
    return res.status(201).json(doc);
  }

  return res.status(405).json({ message: "Method not allowed" });
}


