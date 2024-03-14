const agent = require("./agentServer");

describe("TEST CRUD DE RUTA LEVEL", () => {
  describe("Request GET all /academy/level", () => {
    test("Response status 200", async () => {
      const response = await agent.get("/academy/level");
      expect(response.statusCode).toBe(200);
    });
    test("Response data 200", async () => {
      const response = await agent.get("/academy/level?page=1");
      expect(response.statusCode).toBe(200);
    });
    test("Response data 400", async () => {
      const response = await agent.get("/academy/level?page=10000");
      expect(response.statusCode).toBe(400);
    });
    test("thor error data 400", async () => {
      const response = await agent.get("/academy/level?page=10000");
      const responseBody = response.text;
      const parsedBody = JSON.parse(responseBody);
      expect(parsedBody.error).toBe("There is nothing here");
    });
    test("Response data 400", async () => {
      const response = await agent.get("/academy/level?page=Holis");
      expect(response.statusCode).toBe(400);
    });
    test("Response data 200", async () => {
      const response = await agent.get("/academy/level?page=");
      expect(response.statusCode).toBe(200);
    });
    test("Datos", async () => {
      const response = (await agent.get("/academy/level?page=1")).body;
      expect(response.info).toHaveProperty("count");
      expect(response.info).toHaveProperty("pages");
      expect(response.info).toHaveProperty("next");
      expect(response.info).toHaveProperty("prev");
    });
    test("Datos", async () => {
      const response = (await agent.get("/academy/level?page=1")).body;
      expect(response).toHaveProperty("results");
      expect(response.results).toBeTruthy();
      expect(Array.isArray(response.results)).toBeTruthy();
    });
  });

  describe("Request GET:idClient /academy/level", () => {
    test("Param idLevel is number, response status 200", async () => {
      const response = await agent.get(`/academy/level/1`);
      expect(response.statusCode).toBe(200);
    });
    test("Param idLevel is not to number, response status 400", async () => {
      const idLevel = "!num";
      const response = await agent.get(`/academy/level/${idLevel}`);
      expect(response.statusCode).toBe(400);
    });
    test("Respuestas id typos", async () => {
      const response = (await agent.get(`/academy/level/1`)).body;
      expect(response).toBeTruthy();
      expect(typeof response).toBe("object");
      expect(typeof response).not.toBe("array");
      expect(response).toHaveProperty("idLevel");
      expect(response).toHaveProperty("nameLevel");
    });
  });

  describe("POST /academy/level", () => {
    const data1 = { nameLevel: "Admin" };
    const data2 = { nameLevel: "" };
    test("Add new level and key 'nameLevel' has data, response status 200", async () => {
      const response = await agent.post(`/academy/level`).send(data1);
      expect(response.status).toBe(200);
    });
    test("Add new level and key 'nameLevel' has not data, response status 400", async () => {
      const response = await agent.post(`/academy/level`).send(data2);
      expect(response.status).toBe(400);
    });
    test("se agrego con exito", async () => {
      const response = (await agent.post(`/academy/level`).send(data1)).body;
      expect(response.results).toBeTruthy();
      expect(Array.isArray(response.results)).toBeTruthy();
    });
    test("propiedades", async () => {
      const response = (await agent.post(`/academy/level`).send(data1)).body;
      expect(response).toHaveProperty("info");
      expect(response).toHaveProperty("results");
    });
  });

  describe("UPDATE /academy/level", () => {
    const data1 = { idLevel: 1, nameLevel: "Teacher" };
    const data2 = { idLevel: 20, nameLevel: "" };
    const data3 = { idLevel: "str", nameLevel: "Standar" };
    const data4 = { idLevel: 2000000000, nameLevel: "Recluter" };
    test("Update level, key idLevel is number and'nameLevel' has data, response status 200", async () => {
      const response = await agent.put(`/academy/level`).send(data1);
      expect(response.status).toBe(200);
    });
    test("Update level, key idLevel is number and'nameLevel' has no data, response status 400", async () => {
      const response = await agent.put(`/academy/level`).send(data2);
      expect(response.status).toBe(400);
    });
    test("Update level, key idLevel is string and'nameLevel' has no data, response status 400", async () => {
      const response = await agent.put(`/academy/level`).send(data3);
      expect(response.status).toBe(400);
    });
    test("no existe", async () => {
      const response = await agent.put("/academy/level").send(data4);
      const responseBody = response.text;
      const parsedBody = JSON.parse(responseBody);
      expect(parsedBody.error).toBe(
        "El nivel que usted quiere cambiar no existe"
      );
    });

    test("RESPUESTA {}", async () => {
      const response = (await agent.put(`/academy/level`).send(data1)).body;
      expect(typeof response).toBe("object");
      expect(typeof response).not.toBe("array");
      expect(response).toHaveProperty("idLevel");
      expect(response).toHaveProperty("nameLevel");
    });
  });

  describe("DELETE /academy/level", () => {
    test("Param idLevel is number, response status 200", async () => {
      const response = await agent.delete(`/academy/level/1099999`);
      expect(response.statusCode).toBe(400);
    });

    test("Param idLevel is not to number, response status 400", async () => {
      const idLevel = "!num";
      const response = await agent.delete(`/academy/level/${idLevel}`);
      expect(response.statusCode).toBe(400);
    });

    test("no existe", async () => {
      const response = await agent.delete("/academy/level/10000000000");
      const responseBody = response.text;
      const parsedBody = JSON.parse(responseBody);
      expect(parsedBody.error).toBe(
        "El nivel que usted quiere eliminar no existe"
      );
    });
    test("respuesta debe ser un objeto con la prop info", async () => {
      const response = (await agent.delete("/academy/level/1")).body;
      expect(response.info).toHaveProperty("count");
      expect(response.info).toHaveProperty("pages");
      expect(response.info).toHaveProperty("next");
      expect(response.info).toHaveProperty("prev");
    });
    test("respuesta debe ser un objeto con la prop results", async () => {
      const response = (await agent.delete("/academy/level/1")).body;
      expect(response).toHaveProperty("results");
      expect(response.results).toBeTruthy();
      expect(Array.isArray(response.results)).toBeTruthy();
    });
  });
});
