import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js"
import sessionsRouter from "./sessions.view.js"


const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = ["hp", "pokemon", "batman"];
    const date = new Date();
    return res.render("index", { products: mainProducts, date, title: "INDEX" });
  } catch (error) {
    next(error);
  }
});
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter)
viewsRouter.use("/sessions", sessionsRouter)


export default viewsRouter;
