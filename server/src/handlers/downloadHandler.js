const {
  generateListStudents,
  generateListAssitance,
  generateListQualification,
} = require("../controllers/downloadController");

const getGenerateArchive = async (request, response) => {
  const { idUser, idClass, idAssistance, idParams, option } = request.query;
  try {
    if (option === "listStudents") {
      const data = await generateListStudents(idClass, idUser);
      response.setHeader(
        "Content-Disposition",
        'attachment; filename="lista-estudiantes.pdf"'
      );
      response.setHeader("Content-Type", "application/pdf");
      response.end(data); // Enviar el archivo y terminar la respuesta
    } else if (option === "listAssitance") {
      const excelBuffer = await generateListAssitance(
        idClass,
        idAssistance,
        idUser
      );
      response.setHeader(
        "Content-Disposition",
        'attachment; filename="lista-asistencia.xlsx"'
      );
      response.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      response.end(excelBuffer); // Enviar el archivo y terminar la respuesta
    } else if (option === "listQualification") {
      const excelBuffer = await generateListQualification(
        idUser,
        idClass,
        idParams
      );
      response.setHeader(
        "Content-Disposition",
        'attachment; filename="lista-calificaciones.xlsx"'
      );
      response.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      response.end(excelBuffer); // Enviar el archivo y terminar la respuesta
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = getGenerateArchive;
