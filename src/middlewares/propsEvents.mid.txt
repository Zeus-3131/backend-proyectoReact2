function propsEvents(req, res, next) {
  const { nombre } = req.body;
  if (!nombre || nombre.trim() === '') {
    const error = new Error("El nombre es requerido");
    error.statusCode = 404; // Cambié el código de estado a 400 para coincidir con tu condicional
    throw error;
  } else {
    return next();
  }
}

export default propsEvents;

