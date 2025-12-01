import { connectToDB } from "../../../lib/mongodb";
import { verifyToken } from "../../../lib/verifyToken";
import Certificate from "../../../models/Certificate";

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === "GET") {
    const data = await Certificate.find({});
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    if (!verifyToken(req, res)) return;
    const doc = await Certificate.create(req.body);
    return res.status(201).json(doc);
  }

  return res.status(405).json({ message: "Method not allowed" });
}

