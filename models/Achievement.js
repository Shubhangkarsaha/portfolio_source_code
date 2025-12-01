import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    year: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Achievement || mongoose.model("Achievement", AchievementSchema);

