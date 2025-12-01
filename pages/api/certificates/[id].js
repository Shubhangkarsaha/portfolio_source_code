import { connectToDB } from "../../../../lib/mongodb";
import { verifyToken } from "../../../../lib/verifyToken";
import Certificate from "../../../../models/Certificate";

export default async function handler(req, res) {
  await connectToDB();
  const { id } = req.query;

  if (req.method === "GET") {
    const item = await Certificate.findById(id);
    return res.status(200).json(item);
  }

  if (req.method === "PUT") {
    if (!verifyToken(req, res)) return;
    const updated = await Certificate.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    if (!verifyToken(req, res)) return;
    await Certificate.findByIdAndDelete(id);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Method not allowed" });
}

