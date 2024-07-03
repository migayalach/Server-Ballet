const validateLogin = (request, response, next) => {
  const { email, password } = request.body;
  if (!email.length) {
    return response
      .status(400)
      .json({ access: false, message: "Introduzca email por favor" });
  }
  if (!password.length) {
    return response
      .status(400)
      .json({ access: false, message: "Introduzca password por favor" });
  }
  next();
};

module.exports = { validateLogin };
