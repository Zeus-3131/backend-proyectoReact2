function propsProductsUtils(data) { 
    const { nombre } = data;
    if (!nombre) {
      const error = new Error("El nombre es requerido");
      error.statusCode = 400; 
      throw error;
    }
}

export default propsProductsUtils;
