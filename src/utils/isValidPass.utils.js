function isValidPass(formPassword, dbPassword) {
    if (formPassword !== dbPassword) {
      const error = new Error("Credenciales invalidas");
      error.statusCode = 401;
      throw error;
    }
  }
  
  export default isValidPass;
  