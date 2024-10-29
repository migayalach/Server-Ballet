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
      response.end(data);
      response.status(200).send("Generado con exito");
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

      // Enviar el buffer del archivo Excel
      response.end(excelBuffer); // Cambiado de data a excelBuffer
      response.status(200).send("Generado con exito");
    } else if (option === "listQualification") {
      const data = await generateListQualification(idUser, idClass, idParams);
      response.status(200).json(data);
      // response.status(200).send("Generado con exito");
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = getGenerateArchive;
