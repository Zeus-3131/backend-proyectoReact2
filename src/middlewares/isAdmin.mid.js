import { verifytoken } from "../utils/token.util.js";

// export default (req, res, next) => {
//   try {
//     const data = verifytoken(req.headers)
//     const { role } = data;
//     if (role === 1) {
//       return next();
//     } else {
//       const error = new Error("Prohibido");
//       error.statusCode = 403;
//       throw error; 
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

export default (req, res, next) => {
  try {
    //console.log(req.user);
    const { role } = req.user;
    if (role === 1) {
      return next();
    } else {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
