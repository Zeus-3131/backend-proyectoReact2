// import productsManager from "../data/fs/products.fs.js";
import { productsManager } from "../data/mongo/manager.mongo.js";

export default async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const product = await productsManager.readOne(pid);
    
    if (product.stock >= quantity) {
      return next();
    } else {
      const error = new Error("No hay suficiente stock");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
