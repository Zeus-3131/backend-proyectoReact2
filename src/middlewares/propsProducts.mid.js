import propsProductsUtils from "../utils/propsProducts.utils.js";

function propsProducts(req, res, next) {
  try {
    propsProductsUtils(req.body);
    return next();
  } catch (error) {
    return next(error);
  }
}

export default propsProducts;


