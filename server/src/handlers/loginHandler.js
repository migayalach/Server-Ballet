const loginAccess = require("../controllers/loginController");

const accessLogin = async (request, response) => {
  const { user, password } = request.body;
  try {
    const data = await loginAccess(user, password);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = accessLogin;
