import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true, 
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    }
  },
  { timestamps: true }
);

export const Product = models?.Product || model("Product", productSchema);