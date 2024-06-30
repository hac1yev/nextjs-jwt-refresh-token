import mongoose, { Schema } from "mongoose";
import { Product } from "./product";

const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
      },
      password: {
        type: String,
        required: true,
      },
      favorites: [
        {
          type: Schema.Types.ObjectId,
          ref: Product, 
        },
      ],
    },
    { timestamps: true }
  );
  
  export const User = mongoose.models?.User || mongoose.model("User", userSchema);