const passwordChangeController = require("../controllers/_passwordController");

const changePasswordHandler = async (request, response) => {
  const { idUser, oldPassword, newPassword } = request.body;
  try {
    const data = await passwordChangeController(
      idUser,
      oldPassword,
      newPassword
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = changePasswordHandler;
