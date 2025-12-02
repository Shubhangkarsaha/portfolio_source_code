import mongoose from "mongoose";

const HomeImageSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.HomeImage || mongoose.model("HomeImage", HomeImageSchema);


