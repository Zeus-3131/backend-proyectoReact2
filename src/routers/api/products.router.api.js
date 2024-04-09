import { Router } from "express";
import { productsManager } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import isCapacityOkMid from "../../middlewares/isCapacityOk.mid.js";
import Product from "../../data/mongo/models/product.model.js";

const productsRouter = Router();
productsRouter.post("/",isAuth, isAdmin, propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await productsManager.create(data);
    return res.status(201).json({
      statusCode: 201,
      response, 
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { name: 1 },
    };
    const filter = {};
    if (req.query.name) {
      filter.name = new RegExp(req.query.name.trim(), "i");
    }
    if (req.query.sort === "desc") {
      options.sort.name = "desc";
    }
    const all = await productsManager.read({ filter, options });
    return res.status(200).json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    if (!one) {
      return res.status(404).json({
        statusCode: 404,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", isCapacityOkMid, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await productsManager.update(pid, data);
    return res.status(200).json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await productsManager.destroy(pid);
    return res.status(200).json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
