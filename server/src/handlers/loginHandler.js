const loginAccess = require("../controllers/loginController");

const accessLogin = async (request, response) => {
  const { nameLevel } = request.body;
  try {
    const data = await loginAccess(nameLevel);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = accessLogin;
