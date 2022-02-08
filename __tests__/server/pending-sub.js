require('dotenv').config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const req = request(app);

describe("Test the login path", () => {

  let server;
  let url = process.env.DB_URI + process.env.DB_USER_PASSWORD + "@cluster0.b858k.mongodb.net/" + process.env.DB_PROJECT_NAME;
  let options = { useNewUrlParser: true, useUnifiedTopology: true };

  let jwtAdmin;
  let jwtLambda;

  beforeAll( async () => {
    server = app.listen(3000);
    mongoose.connect(url, options);

    await req
      .post("/login")
      .send('username=admintest')
      .send('password=admintest')
      .expect(200, { message: "User successfully logged in" })
      .then((res) => {
        jwtAdmin = res.headers['set-cookie'][0].split(';')[0].replace('jwt=', '');
      })

      await req
      .post("/login")
      .send('username=usertest')
      .send('password=usertest')
      .expect(200, { message: "User successfully logged in" })
      .then((res) => {
        jwtLambda = res.headers['set-cookie'][0].split(';')[0].replace('jwt=', '');
      })

  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it("should response the GET method while being authenticated as an admin", async () => {
    await req
      .get("/pending-subscriptions")
      .set('Authorization', `Bearer ${jwtAdmin}`)
      .expect(200);
  });

  it("should send an error if user isn't authenticated", async () => {
    await req
      .get("/pending-subscriptions")
      .expect(401);
  });

  it("should send an error if user isn't an admin", async () => {
    await req
      .get("/pending-subscriptions")
      .set('Authorization', `Bearer ${jwtLambda}`)
      .expect(401);
  });

});