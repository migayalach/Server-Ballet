const server = require("../app");
const session = require("supertest");
const agent = session(server);

describe("TEST CRUD DE RUTA LEVEL", () => {
  describe("Request GET all /academy/level", () => {
    test("Response status 200", async () => {
      const response = await agent.get("/academy/level");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Request GET:idClient /academy/level", () => {
    test("Param idLevel is number, response status 200", async () => {
      const response = await agent.get(`/academy/level/10`);
      expect(response.statusCode).toBe(200);
    });

    test("Param idLevel is not to number, response status 400", async () => {
      const idLevel = "!num";
      const response = await agent.get(`/academy/level/${idLevel}`);
      expect(response.statusCode).toBe(400);
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
  });

  describe("UPDATE /academy/level", () => {
    const data1 = { idLevel: 10, nameLevel: "Admin" };
    const data2 = { idLevel: 20, nameLevel: "" };
    const data3 = { idLevel: "str", nameLevel: "Standar" };
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
  });

  describe("DELETE /academy/level", () => {
    test("Param idLevel is number, response status 200", async () => {
      const response = await agent.delete(`/academy/level/10`);
      expect(response.statusCode).toBe(200);
    });

    test("Param idLevel is not to number, response status 400", async () => {
      const idLevel = "!num";
      const response = await agent.delete(`/academy/level/${idLevel}`);
      expect(response.statusCode).toBe(400);
    });
  });
});
