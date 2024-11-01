const ExcelJS = require("exceljs");

const listAssistanceExcel = async (data, info) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Asistencia");

  // Agregar encabezado principal y fusionar celdas
  const titleRow = worksheet.addRow(["Lista de Asistencia"]);
  titleRow.font = { bold: true, size: 16 }; // Título en negrita y más grande
  titleRow.alignment = { horizontal: "center" }; // Centrar el título
  worksheet.mergeCells(`A1:E1`); // Fusionar celdas desde A1 hasta E1 para el título
  worksheet.addRow([]); // Fila vacía para separación

  // Agregar información complementaria
  if (info && info.length > 0) {
    const { teacher, nameClass, parallel, date } = info[0]; // Suponiendo que hay al menos un elemento en info

    worksheet.addRow(["Fecha:", date]);
    worksheet.addRow(["Profesor:", teacher]);
    worksheet.addRow(["Clase:", nameClass]);
    worksheet.addRow(["Paralelo:", parallel]);
    worksheet.addRow([]); // Fila vacía para separación
  }

  // Definir los encabezados de la tabla de asistencia
  worksheet.addRow([]); // Fila vacía para separación antes de los encabezados
  worksheet.addRow(["N°", "Nombre", "Apellido", "Carnet", "Asistencia"]).font =
    { bold: true }; // Encabezados en negrita

  // Definir el ancho de las columnas
  worksheet.columns = [
    { key: "index", width: 10 },
    { key: "nameUser", width: 20 },
    { key: "lastNameUser", width: 20 },
    { key: "carnetUser", width: 15 },
    { key: "assistance", width: 15 },
  ];

  // Agregar datos de asistencia
  data.forEach((item) => {
    worksheet.addRow(item);
  });

  // Aplicar estilos a las filas
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // Guardar el archivo
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

const listQualificationExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Calificaciones");

  // Agregar encabezado principal y fusionar celdas
  const titleRow = worksheet.addRow(["Lista de Calificaciones"]);
  titleRow.font = { bold: true, size: 16 }; // Título en negrita y más grande
  titleRow.alignment = { horizontal: "center" }; // Centrar el título
  worksheet.mergeCells(`A1:G1`); // Fusionar celdas desde A1 hasta G1 para el título
  worksheet.addRow([]); // Fila vacía para separación

  // Definir los encabezados de la tabla de calificaciones
  worksheet.addRow([
    "N°",
    "Nombre",
    "Apellido",
    "Carnet",
    "Departamento",
    "Calificación",
    "Observación",
    "Nota",
  ]).font = { bold: true }; // Encabezados en negrita

  // Definir el ancho de las columnas
  worksheet.columns = [
    { key: "index", width: 5 },
    { key: "nameUser", width: 20 },
    { key: "lastNameUser", width: 20 },
    { key: "carnetUser", width: 15 },
    { key: "department", width: 20 },
    { key: "qualification", width: 15 },
    { key: "observation", width: 20 },
    { key: "note", width: 20 },
  ];

  // Agregar datos de calificaciones
  data.forEach((item, index) => {
    worksheet.addRow({
      index: index + 1,
      ...item,
    });
  });

  // Aplicar bordes a las celdas
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // Guardar el archivo
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

module.exports = { listAssistanceExcel, listQualificationExcel };
