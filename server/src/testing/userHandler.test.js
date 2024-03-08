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

  describe("POST /academy/user", () => {
    test("Add new User and key 'nameLevel' has data, response status 200", async () => {
      const response = await agent.post(`/academy/user`).send(user1);
      expect(response.status).toBe(200);
    });
    test("Add new level and key 'nameLevel' has not data, response status 400", async () => {
      const response = await agent.post(`/academy/user`).send(user2);
      expect(response.status).toBe(400);
    });
    test("Add new User and key 'nameLevel' has data, response status 400", async () => {
      const response = await agent.post(`/academy/user`).send(user3);
      expect(response.status).toBe(400);
    });
    test("Add new level and key 'nameLevel' has not data, response status 400", async () => {
      const response = await agent.post(`/academy/user`).send(user4);
      expect(response.status).toBe(400);
    });
    test("Add new User and key 'nameLevel' has data, response status 400", async () => {
      const response = await agent.post(`/academy/user`).send(user5);
      expect(response.status).toBe(400);
    });
    test("Add new level and key 'nameLevel' has not data, response status 400", async () => {
      const response = await agent.post(`/academy/user`).send(user6);
      expect(response.status).toBe(400);
    });
    test("Add new User and key 'nameLevel' has data, response status 400", async () => {
      const response = await agent.post(`/academy/user`).send(user7);
      expect(response.status).toBe(400);
    });
  });

  describe("UPDATE /academy/user", () => {
    test("Update level, key idLevel is number and'nameLevel' has data, response status 200", async () => {
      const response = await agent.put(`/academy/user`).send(user1);
      expect(response.status).toBe(200);
    });
    test("Update level, key idLevel is number and'nameLevel' has no data, response status 400", async () => {
      const response = await agent.put(`/academy/user`).send(user2);
      expect(response.status).toBe(400);
    });
    test("Update level, key idLevel is string and'nameLevel' has no data, response status 400", async () => {
      const response = await agent.put(`/academy/user`).send(user3);
      expect(response.status).toBe(400);
    });
    test("Update level, key idLevel is string and'nameLevel' has no data, response status 400", async () => {
      const response = await agent.put(`/academy/user`).send(user4);
      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /academy/user", () => {
    test("Param idLevel is number, response status 200", async () => {
      const response = await agent.delete(`/academy/user/10`);
      expect(response.statusCode).toBe(200);
    });

    test("Param idLevel is not to number, response status 400", async () => {
      const idUser = "!num";
      const response = await agent.delete(`/academy/user/${idUser}`);
      expect(response.statusCode).toBe(400);
    });
  });
});
