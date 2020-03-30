import "babel-polyfill";
const app = require('../../server/index.js');
const request = require("supertest");

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/all")
      .then((response) => {
        expect(response.statusCode).toBe(200);
    });
  });
});