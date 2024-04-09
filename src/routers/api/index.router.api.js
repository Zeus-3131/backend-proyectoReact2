import { Router } from "express";
import usersRouter from "./users.router.api.js";
// import eventsRouter from "./events.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";
// import cookiesRouter from "./cookies.router.api.js";
import sessionsRouter from "./sessions.router.api.js";

import passCallBackMid from "../../middlewares/passCallBack.mid.js";


const apiRouter = Router()

//definir los enrutadores de los recursos
apiRouter.use("/users",usersRouter)
// apiRouter.use("/events",eventsRouter)
// apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/products",productsRouter)
apiRouter.use("/orders" ,passCallBackMid("jwt"),ordersRouter)
apiRouter.use("/sessions", sessionsRouter);


export default apiRouter