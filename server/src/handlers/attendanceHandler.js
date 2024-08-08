const {
  addAttendance,
  getAllList,
  getPageAttendance,
} = require("../controllers/attendanceController");

const postAttendance = async (request, response) => {
  const { idAssistance, list } = request.body;
  try {
    const data = await addAttendance(idAssistance, list);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getAllAttendanceDate = async (request, response) => {
  const { idAssistance, flag } = request.params;
  try {
    const data = await getAllList(idAssistance, flag);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getAttendancePage = async (request, response) => {
  const { idAssistance, page } = request.query;
  try {
    const data = await getPageAttendance(idAssistance, page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = { postAttendance, getAllAttendanceDate, getAttendancePage };
