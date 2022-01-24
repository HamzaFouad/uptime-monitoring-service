import mongoose from "mongoose";

const checkSchema = new mongoose.Schema(
  {
    name: String,
    url: { type: String, required: true },
    path: String,
    port: Number,
    webhook: [String],
    tags: [String],
    avgResponse: Number,
    availability: Number,
    uptime: Number,
    downtime: Number,
    status: Boolean,
    config: { type: mongoose.Schema.Types.ObjectId, ref: "config" },
  },
  { timestamps: true }
);

export const Check = mongoose.model("check", checkSchema);
