require('dotenv').config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const req = request(app);

describe("Test the login path", () => {

  let server;
  let url = process.env.DB_URI + process.env.DB_USER_PASSWORD + "@cluster0.b858k.mongodb.net/" + process.env.DB_PROJECT_NAME;
  let options = { useNewUrlParser: true, useUnifiedTopology: true };

  let jwtcookie;

  beforeAll(() => {
    server = app.listen(3000);
    mongoose.connect(url, options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it("should log in with correct username/password", async () => {
    await req
      .post("/login")
      .send('username=admintest')
      .send('password=admintest')
      .expect(200, { message: "User successfully logged in" })
      .then((res) => {
        jwtcookie = res.headers['set-cookie'][0].split(';')[0];
      })
  });

  it("should send an error if given username is wrong", async () => {
    await req
      .post("/login")
      .send('username=nothing')
      .send('password=admintest')
      .expect(500, { message: "Error: Incorrect username" });
  });

  it("should send an error if given password is wrong", async () => {
    await req
      .post("/login")
      .send('username=admintest')
      .send('password=nothing')
      .expect(500, { message: "Error: Incorrect password" });
  });

  it("should send an error if user isn't validated yet", async () => {
    await req
      .post("/login")
      .send('username=pendingaccount1')
      .send('password=pendingaccount1')
      .expect(500, { message: "Error: User has not been validated yet, please wait until an admin validates your account" });
  });

  it("should send an error if user is already authenticated", async () => {
    await req
      .post("/login")
      .send('username=admintest')
      .send('password=admintest')
      .set('Cookie', jwtcookie)
      .expect(400, { message: "User already logged in." });
  });

});