import { model, Schema } from "mongoose";
import crypto from "crypto";

const collection = "products";
const schema = new Schema(
  {
    nombre: { type: String, required: true },
    imagen: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    precio: { type: Number, default: 10 },
    stock: { type: Number, default: 50 },
    idcat: { type: String, default: crypto.randomBytes(12).toString("hex") },
    date: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

const Event = model(collection, schema);
export default Event;
