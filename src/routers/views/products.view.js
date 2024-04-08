import { Router } from "express";
import products from "../../data/fs/products.fs.js";

const productsRouter = Router();

productsRouter.get("/real", (req, res, next) => {
  try {
    return res.render("real", { title: "REAL" });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/form", async (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const one = await events.readOne(eid);
    return res.render("detail", { event: one });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
