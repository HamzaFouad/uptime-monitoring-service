import mongoose from "mongoose";

const checkConfigSchema = new mongoose.Schema(
  {
    protocol: { type: String, enum: ["http", "https", "tcp"], default: "http" },
    authentication: {
      username: String,
      passower: String,
    },
    httpHeaders: { type: Object, default: null },
    assert: { type: Object, default: null },
    ignoreSSL: Boolean,
    timeout: { type: Number, default: 5 },
    interval: { type: Number, default: 10 * 60 },
    threshold: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const CheckConfig = mongoose.model("config", checkConfigSchema);
