const loginAccess = async (user, password) => {
  return { access: true, user, password };
};

module.exports = loginAccess;
