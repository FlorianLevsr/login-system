require('dotenv').config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const req = request(app);

describe("Test the root path", () => {

  let server;
  let url = process.env.DB_URI + process.env.DB_USER_PASSWORD + "@cluster0.b858k.mongodb.net/" + process.env.DB_PROJECT_NAME;
  let options = { useNewUrlParser: true, useUnifiedTopology: true };

  beforeAll(() => {
    server = app.listen(3000);
    mongoose.connect(url, options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it("should response the GET method", async () => {
    await req
      .get("/")
      .expect(200);
  });

  it("should not response the POST method", async () => {
    await req
      .post("/")
      .expect(404);
  });

  it("should not response the DELETE method", async () => {
    await req
      .delete("/")
      .expect(404);
  });

  it("should not response the PUT method", async () => {
    await req
      .put("/")
      .expect(404);
  });

});