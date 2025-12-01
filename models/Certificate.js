import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    title: String,
    issuer: String,
    issueDate: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema);

