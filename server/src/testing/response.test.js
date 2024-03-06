const { responseData } = require("../utils/response");

describe("Return function 'response'", () => {
  describe("Funtion responseData?", () => {
    it("This is a function", () => {
      expect(typeof responseData).toBe("function");
    });
  });

  describe("Response property", () => {
    it("Return two properties: 'info', 'results'", async () => {
      expect(responseData()).toHaveProperty("info");
      expect(responseData()).toHaveProperty("results");
    });
  });
  
  describe("Response 'info' propeties", () => {
    it("The properties: 'count', 'pages', 'next', 'prev'", async () => {
      expect(responseData().info).toHaveProperty("count");
      expect(responseData().info).toHaveProperty("pages");
      expect(responseData().info).toHaveProperty("next");
      expect(responseData().info).toHaveProperty("prev");
    });
  });
});
