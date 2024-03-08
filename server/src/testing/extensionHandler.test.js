const server = require("../app");
const session = require("supertest");
const agent = session(server);
const {
  postExtensionData1,
  postExtensionData2,
  postExtensionData3,
  postExtensionData4,
  putExtensionData5,
  putExtensionData6,
  putExtensionData7,
  putExtensionData8,
  deleteExtension,
  databaseExample,
} = require("../data/extensionDataTest");

describe("TEST CRUD DE RUTA EXTENSION", () => {
  describe("Request GET all /academy/extension", () => {
    test("Response status 200", async () => {
      const response = await agent.get("/academy/extension");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("POST /academy/extension", () => {
    test("Add new level and key 'nameExtension' has data, response status 200", async () => {
      const response = await agent
        .post(`/academy/extension`)
        .send(postExtensionData1);
      expect(response.status).toBe(200);
    });
    test("Add new level and key 'nameLevel' has not data, response status 400", async () => {
      const response = await agent
        .post(`/academy/extension`)
        .send(postExtensionData2);
      expect(response.status).toBe(400);
    });
    test("Add new level and key 'extension' has not data, response status 400", async () => {
      const response = await agent
        .post(`/academy/extension`)
        .send(postExtensionData3);
      expect(response.status).toBe(400);
    });
    test("Add new level and key 'extension' has not data, response status 400", () => {
      expect(databaseExample.includes(postExtensionData4.nameExtension)).toBe(
        true
      );
    });
  });

  describe("UPDATE /academy/extension", () => {
    test("Envio de datos correcto, se espera un 200", async () => {
      const response = await agent
        .put(`/academy/extension`)
        .send(putExtensionData5);
      expect(response.status).toBe(200);
    });
    test("idExtension es una cadena y nameExtension es un numero, se espera un 400", async () => {
      const response = await agent
        .put(`/academy/extension`)
        .send(putExtensionData6);
      expect(response.status).toBe(400);
    });
    test("idExtension es un numero y nameExtension es una cadena de numeros, se espera un 400", async () => {
      const response = await agent
        .put(`/academy/extension`)
        .send(putExtensionData7);
      expect(response.status).toBe(400);
    });
    test("idExtension es un numero y nameExtension es una cadena vacia, se espera un 400", async () => {
      const response = await agent
        .put(`/academy/extension`)
        .send(putExtensionData7);
      expect(response.status).toBe(400);
    });
    test("Datos correctos se pasara a editar, pero estara repetido el nombre, se espera un TRUE", () => {
      expect(databaseExample.includes(postExtensionData1.nameExtension)).toBe(
        true
      );
    });
  });

  describe("DELETE /academy/extension", () => {
    test("Param idLevel is number, response status 200", async () => {
      const response = await agent.delete(`/academy/extension/10`);
      expect(response.statusCode).toBe(200);
    });

    test("Param idLevel is not to number, response status 400", async () => {
      const idLevel = "!num";
      const response = await agent.delete(`/academy/extension/${idLevel}`);
      expect(response.statusCode).toBe(400);
    });

    test("El id existe en la base de datos", () => {
      expect(databaseExample.includes(postExtensionData1.idExtension)).toBe(
        false
      );
    });
  });
});
