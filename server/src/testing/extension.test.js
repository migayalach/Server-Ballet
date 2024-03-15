const agent = require("./agentServer");
const direction = "/academy/extension";
describe("TEST CRUD EXTENSION", () => {
  describe(`Request GET ALL ${direction}`, () => {
    test("Respuesta estado 200", async () => {
      const response = await agent.get(`${direction}`);
      expect(response.statusCode).toBe(200);
    });
    test("Respuesta estado 200", async () => {
      const response = await agent.get(`${direction}?page=1`);
      expect(response.statusCode).toBe(200);
    });
    test("Respuesta estado 400", async () => {
      const response = await agent.get(`${direction}?page=10000`);
      expect(response.statusCode).toBe(400);
    });
    test("thor error data 400", async () => {
      const response = await agent.get(`${direction}?page=10000`);
      const responseBody = response.text;
      const parsedBody = JSON.parse(responseBody);
      expect(parsedBody.error).toBe("There is nothing here");
    });
    test("Response data 400", async () => {
      const response = await agent.get(`${direction}?page=Holis`);
      expect(response.statusCode).toBe(400);
    });
    test("Response data 200", async () => {
      const response = await agent.get(`${direction}?page=`);
      expect(response.statusCode).toBe(200);
    });
    test("Datos", async () => {
      const response = (await agent.get(`${direction}?page=1`)).body;
      expect(response.info).toHaveProperty("count");
      expect(response.info).toHaveProperty("pages");
      expect(response.info).toHaveProperty("next");
      expect(response.info).toHaveProperty("prev");
    });
    test("Datos", async () => {
      const response = (await agent.get(`${direction}?page=1`)).body;
      expect(response).toHaveProperty("results");
      expect(response.results).toBeTruthy();
      expect(Array.isArray(response.results)).toBeTruthy();
    });
  });
  describe("Request POST CREATE", () => {
    const data1 = { nameExtension: "LP" };
    const data2 = { nameExtension: "VIVALAVIDA" };
    const data3 = { nameExtension: "" };
    const data4 = { nameExtension: "AR" };
    test("Añadir nueva Extension, respuesta estado 200", async () => {
      const response = await agent.post(`${direction}`).send(data4);
      expect(response.status).toBe(200);
    });
    test("Error al añadir una nueva extension, error 400", async () => {
      const response = await agent.post(`${direction}`).send(data2);
      expect(response.status).toBe(400);
    });
    test("Error al añadir una nueva extension vac ia, error 400", async () => {
      const response = await agent.post(`${direction}`).send(data3);
      expect(response.status).toBe(400);
    });
    test("Extension vacia", async () => {
      const response = await agent.post(`${direction}`).send(data3);
      const responseBody = response.text;
      const parsedBody = JSON.parse(responseBody);
      expect(parsedBody.error).toBe(
        "Por favor ingrese un nombre para la extension"
      );
    });
    test("Exeder el maximo de caracteres permitidos", async () => {
      const response = await agent.post(`${direction}`).send(data2);
      const responseBody = response.text;
      const parsedBody = JSON.parse(responseBody);
      expect(parsedBody.error).toBe(
        "La extension no debe ser mayor a cuatro caracteres"
      );
    });
    test("No puede haber repetidos", async () => {
      const response = await agent.post(`${direction}`).send(data1);
      const responseBody = response.text;
      const parsedBody = JSON.parse(responseBody);
      expect(parsedBody.error).toBe("No puedo haber extensiones repetidas");
    });
  });
});
