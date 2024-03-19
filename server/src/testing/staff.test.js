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
  idLevel: 1,
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
    xtest("Creacion sin exito y respuesta 400", async () => {
      const response = (await agent.post(`${URL_STAFF}`).send(data2)).text;
      const resonseBody = JSON.parse(response);
      expect(resonseBody.error).toBe(
        "Los id de nivel y extension deben ser numeros"
      );
    });
    xtest("Creacion sin exito, nivel de acceso no existe", async () => {
      const response = (await agent.post(`${URL_STAFF}`).send(data1)).text;
      const resonseBody = JSON.parse(response);
      expect(resonseBody.error).toBe("El nivel de acceso no existe");
    });
    xtest("Por favor ingrese los datos requeridos, error", async()=>{
      const response = (await agent.post(`${URL_STAFF}`).send(data4)).text;
      const resonseBody = JSON.parse(response);
      expect(resonseBody.error).toBe("Por favor ingrese los datos requeridos");
    });

    test("Datos completos", () => {});
  });

  xdescribe("GET ALL", () => {
    test("", () => {});
  });

  xdescribe("GET ID", () => {
    test("", () => {});
  });

  xdescribe("UPDATE", () => {
    test("", () => {});
  });

  xdescribe("DELETE", () => {
    test("", () => {});
  });
});
