import propsProductsUtils from "../utils/propsProducts.utils.js";

function propsProducts(req, res, next) {
<<<<<<< HEAD
=======
  // const { nombre } = req.body;
  // if (!nombre || nombre.trim() === '') {
  //   const error = new Error("El nombre es requerido");
  //   error.statusCode = 400; // Cambié el código de estado a 400 para indicar un error en la solicitud del cliente
  //   throw error;
  // } else {
  //   return next();
  // }
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108
  try {
    propsProductsUtils(req.body);
    return next();
  } catch (error) {
    return next(error);
  }
}

export default propsProducts;


