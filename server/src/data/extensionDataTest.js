// *POST
const postExtensionData1 = {
  nameExtension: "Or",
};

const postExtensionData2 = {
  nameExtension: 1321,
};

const postExtensionData3 = {
  nameExtension: "",
};

// !REPEATED DATA
const postExtensionData4 = {
  nameExtension: "Or",
};

// *PUT
const putExtensionData5 = {
  idExtension: 1,
  nameExtension: "Or",
};

const putExtensionData6 = {
  idExtension: "1213",
  nameExtension: 1321,
};

const putExtensionData7 = {
  idExtension: 1213,
  nameExtension: "1231",
};

const putExtensionData8 = {
  idExtension: 1213,
  nameExtension: "",
};

// *DELETE ID
const deleteExtension = {
  idNumber: 1,
  idSringNumber: "12",
  idStringEmphy: "",
  idStirngData: "Holis",
  idStringMix: "H123P",
};

module.exports = {
  postExtensionData1,
  postExtensionData2,
  postExtensionData3,
  postExtensionData4,
  putExtensionData5,
  putExtensionData6,
  putExtensionData7,
  putExtensionData8,
  deleteExtension,
};
