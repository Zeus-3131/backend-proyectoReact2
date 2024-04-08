function notFoundOne(one) {
    if (!one) {
      const error = new Error("No hay ningún documento");
      error.statusCode = 404;
      throw error;
    }
  }
  
  export default notFoundOne;
  