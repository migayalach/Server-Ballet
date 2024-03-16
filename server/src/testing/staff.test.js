const agent = require("./agentServer");
const URL_STAFF = `/academy/staff`;
const {
  levelExist,
  extensionExist,
  userRepeated,
} = require("../controllers/controllerData");
const { createStaff } = require("../controllers/staffController");

const data1 = {
  idLevel: 1,
  idExtension: 3,
  nameStaff: "Rafael",
  lastNameStaff: "Choque Perez",
  emailStaff: "rafael@gmail.com",
  addressStaff: "z. Viva",
  dateBirthStaff: "1905-06-10",
  carnetStaff: 8349,
  photoStaff:
    "https://www.suzuki.com.bo/media/fvli4nhu/foto_0000009420220526152924_turquesa.png",
};

const data2 = {
  idLevel: "1",
  idExtension: "3",
  nameStaff: "Rafael",
  lastNameStaff: "Choque Perez",
  emailStaff: "rafael@gmail.com",
  addressStaff: "z. Viva",
  dateBirthStaff: "1905-06-10",
  carnetStaff: "8349",
  photoStaff:
    "https://www.suzuki.com.bo/media/fvli4nhu/foto_0000009420220526152924_turquesa.png",
};

const data3 = {
  idLevel: "",
  idExtension: "",
  nameStaff: "Rafael",
  lastNameStaff: "Choque Perez",
  emailStaff: "rafael@gmail.com",
  addressStaff: "z. Viva",
  dateBirthStaff: "1905-06-10",
  carnetStaff: "",
  photoStaff:
    "https://www.suzuki.com.bo/media/fvli4nhu/foto_0000009420220526152924_turquesa.png",
};
const data4 = {
  idLevel: 100000000000,
  idExtension: 3000000,
  nameStaff: "",
  lastNameStaff: "",
  emailStaff: "rafael@gmail.com",
  addressStaff: "z. Viva",
  dateBirthStaff: "1905-06-10",
  carnetStaff: 8349,
  photoStaff:
    "https://www.suzuki.com.bo/media/fvli4nhu/foto_0000009420220526152924_turquesa.png",
};
const data5 = {
  idLevel: 1,
  idExtension: 3,
  nameStaff: "Rafael",
  lastNameStaff: "",
  emailStaff: "rafael@gmail.com",
  addressStaff: "z. Viva",
  dateBirthStaff: "1905-06-10",
  carnetStaff: 8349,
  photoStaff:
    "https://www.suzuki.com.bo/media/fvli4nhu/foto_0000009420220526152924_turquesa.png",
};

describe("POST STAFF", () => {
  describe("CREATE", () => {
    test("Crear con exito y respuesta 200", async () => {
      const response = await agent.post(`${URL_STAFF}`);
      expect(response.statusCode).toBe(200);
    });

    test("Datos completos", () => {
      
    });
  });

  describe("GET ALL", () => {
    test("", () => {});
  });

  describe("GET ID", () => {
    test("", () => {});
  });

  describe("UPDATE", () => {
    test("", () => {});
  });

  describe("DELETE", () => {
    test("", () => {});
  });
});
