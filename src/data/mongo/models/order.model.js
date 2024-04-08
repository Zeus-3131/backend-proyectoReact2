import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, default: 1 },
    status: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    },
    idcat: { type: Types.ObjectId, ref: "categories" } // Agrega el campo idcat
  },
  { timestamps: true }
);

// Ajusta la función para poblar los campos relacionados
schema.pre(/^find/, function (next) {
  this.populate("user_id", "-password -createdAt -updatedAt -__v");
  this.populate("product_id", "nombre precio stock");
  this.populate("idcat", "-createdAt -updatedAt -__v"); // Poblar el campo idcat
  next();
});

const Order = model(collection, schema);
export default Order;
