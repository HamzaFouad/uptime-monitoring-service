import mongoose from "mongoose";
import { hash } from "../utils/crypto";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    observers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "check",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    this.password = await hash(this.password);
  } catch {
    console.log("Error while hashing password");
  }
  next();
});

export const User = mongoose.model("user", userSchema);
