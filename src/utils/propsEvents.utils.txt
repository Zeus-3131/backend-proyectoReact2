function propsEventsUtils(data) {
  const { nombre } = data;
  if (!nombre) {
    const error = new Error("El nombre es requerido");
    error.statusCode = 404;
    throw error;
  }
}
 
export default propsEventsUtils;
