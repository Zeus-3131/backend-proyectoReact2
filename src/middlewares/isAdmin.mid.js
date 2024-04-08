import { verifytoken } from "../utils/token.util.js";

export default (req, res, next) => {
  try {
<<<<<<< HEAD
    const data = verifytoken(req.headers)
    const { role } = data;
    if (role === 1) {
      return next();
    } else {
      const error = new Error("Prohibido");
      error.statusCode = 403;
      throw error; 
=======
    const { role } = req.session;
    if (role==="admin") {
      return next()
    } else {
      const error = new Error("Prohibido")
      error.statusCode = 403
      throw error
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108
    }
  } catch (error) {
    return next(error);
  }
};
