const PDFDocument = require("pdfkit");

const listStudentsPDF = (data) => {
  const document = new PDFDocument({ size: "letter" });
  const buffers = [];

  document.on("data", buffers.push.bind(buffers));
  document.on("end", () => Buffer.concat(buffers));

  // Definir márgenes
  const marginTop = 20; // Margen superior
  const marginLeft = 55; // Margen izquierdo
  const marginRight = 50; // Margen derecho

  document.fontSize(20).text("Lista de Estudiantes", { align: "center" });
  document.moveDown(); // Espacio entre el título y la tabla

  // Establece la posición inicial para la tabla
  const tableTop = document.y + 20; // Espacio para el encabezado

  // Define los anchos de las columnas (en puntos)
  const columnWidths = [20, 170, 180, 70, 50]; // Ajusta aquí los anchos de las columnas

  // Dibujar encabezados de la tabla
  document.fontSize(12); // Tamaño de letra del encabezado
  document.text("N°", marginLeft, tableTop);
  document.text("Nombre", marginLeft + columnWidths[0], tableTop);
  document.text(
    "Email",
    marginLeft + columnWidths[0] + columnWidths[1],
    tableTop
  );
  document.text(
    "Carnet",
    marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2],
    tableTop
  );
  document.text(
    "Teléfono",
    marginLeft +
      columnWidths[0] +
      columnWidths[1] +
      columnWidths[2] +
      columnWidths[3],
    tableTop
  );

  // Dibujar una línea debajo del encabezado
  document
    .moveTo(marginLeft, tableTop + 20)
    .lineTo(document.page.width - marginRight, tableTop + 20)
    .stroke();

  // Limitar a 18 alumnos por página
  const studentsPerPage = 18;
  const totalStudents = data.length;

  for (let i = 0; i < totalStudents; i++) {
    const item = data[i];
    const y = tableTop + 30 + (i % studentsPerPage) * 30; // Incrementar Y para cada fila

    // Controlar el salto de página
    if (i > 0 && i % studentsPerPage === 0) {
      document.addPage(); // Crear una nueva página
      document.fontSize(20).text("Lista de Estudiantes", { align: "center" });
      document.moveDown();
      const newTableTop = document.y + 20; // Recalcular la parte superior de la tabla

      // Dibujar encabezados de la tabla nuevamente
      document.fontSize(10);
      document.text("N°", marginLeft, newTableTop);
      document.text("Nombre", marginLeft + columnWidths[0], newTableTop);
      document.text(
        "Email",
        marginLeft + columnWidths[0] + columnWidths[1],
        newTableTop
      );
      document.text(
        "Carnet",
        marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2],
        newTableTop
      );
      document.text(
        "Teléfono",
        marginLeft +
          columnWidths[0] +
          columnWidths[1] +
          columnWidths[2] +
          columnWidths[3],
        newTableTop
      );
      document
        .moveTo(marginLeft, newTableTop + 20)
        .lineTo(document.page.width - marginRight, newTableTop + 20)
        .stroke();
    }

    // Escribir los datos
    document.fontSize(10); // Tamaño de letra del contenido
    document.text(`${item.index}`, marginLeft, y);
    document.text(
      `${item.nameUser} ${item.lastNameUser}`,
      marginLeft + columnWidths[0],
      y
    );
    document.text(
      `${item.emailUser}`,
      marginLeft + columnWidths[0] + columnWidths[1],
      y
    );
    document.text(
      `${item.carnetUser}`,
      marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2],
      y
    );
    document.text(
      `${item.numberPhone}`,
      marginLeft +
        columnWidths[0] +
        columnWidths[1] +
        columnWidths[2] +
        columnWidths[3],
      y
    );

    // Solo dibujar una línea horizontal para separar las filas
    if (i < totalStudents - 1) {
      document
        .moveTo(marginLeft, y + 10)
        .lineTo(document.page.width - marginRight, y + 10)
        .stroke();
    }
  }

  // Finaliza el documento
  document.end();

  return new Promise((resolve) => {
    document.on("end", () => resolve(Buffer.concat(buffers)));
  });
};

module.exports = {
  listStudentsPDF,
};
