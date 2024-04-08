import "dotenv/config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import socketUtils from "./src/utils/socket.utils.js";
import router from "./src/routers/index.router.js";
import dbConnection from "./src/utils/db.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js"; 
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";

//server
const server = express();
const PORT = 8080;
const ready = () => {
    console.log("servidor iniciado en el puerto " + PORT);
    dbConnection();
  };
const httpServer = createServer(server);
export const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);


const FileStore = sessionFileStore(expressSession);
//middlewares
server.use(cookieParser(process.env.SECRET_KEY)); 
//MEMORY STORE
/* server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
); */
//FILE STORE
/* server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
      path: "./src/data/fs/files/sessions",
      ttl: 10,
      retries: 2,
    }),
  })
); */
//MONGO STORE
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60, //chequear la unidad de ttl
      mongoUrl: process.env.DB_LINK,
    }),
  })
);
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname+"/public"))
server.use(morgan("dev"))
server.use("/",router)
server.use(errorHandler)
server.use(pathHandler)

//templates
server.engine("handlebars",engine())
server.set("view engine", "handlebars")
server.set("views", __dirname+"/src/views")

//routers
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);