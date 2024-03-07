const server = require("../app");
const session = require("supertest");
const agent = session(server);
const {
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
} = require("../data/userDataTest");

describe("TEST CRUD DE RUTA USER", () => {
  describe("Request GET all /academy/user", () => {
    test("Response status 200", async () => {
      const response = await agent.get("/academy/user");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Request GET:idUser /academy/user", () => {
    test("Param idUser is number, response status 200", async () => {
      const response = await agent.get(`/academy/user/10`);
      expect(response.statusCode).toBe(200);
    });

    test("Param idLevel is not to number, response status 400", async () => {
      const idLevel = "!num";
      const response = await agent.get(`/academy/level/${idLevel}`);
      expect(response.statusCode).toBe(400);
    });
  });

  xdescribe("POST /academy/user", () => {
    test("Add new User and key 'nameLevel' has data, response status 200", async () => {
      const response = await agent.post(`/academy/user`).send(user1);
      expect(response.status).toBe(200);
    });
    test("Add new level and key 'nameLevel' has not data, response status 400", async () => {
      const response = await agent.post(`/academy/user`).send(data2);
      expect(response.status).toBe(400);
    });
  });

  xdescribe("UPDATE /academy/level", () => {
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

  xdescribe("DELETE /academy/level", () => {
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
