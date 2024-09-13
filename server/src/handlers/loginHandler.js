const loginAccess = require("../controllers/loginController");

// TODO: PROPORCIONAR 'email y password' EN EL CUERPO DE LA SOLICITUD PARA ACCEDER A LA SESIÓN
const accessLogin = async (request, response) => {
  const { email, password } = request.body;
  try {
    const data = await loginAccess(email, password);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ message: error.message, access: false });
  }
};

module.exports = accessLogin;
