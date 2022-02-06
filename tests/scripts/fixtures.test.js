require('dotenv').config();
const { MongoClient } = require('mongodb');

describe('Fixtures script', () => {

  let client;
  let dbName;
  let db;

  beforeAll(async () => {
    client = new MongoClient(process.env.DB_URI + process.env.DB_USER_PASSWORD + "@cluster0.b858k.mongodb.net/" + process.env.DB_PROJECT_NAME);
    dbName = process.env.DB_PROJECT_NAME;
    db = client.db(dbName);
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  it('should remove collections from db', async () => {
    const colls = await db.listCollections().toArray();
    colls.forEach(coll => {
      db.collection(coll.name).drop();
    });

    expect(await db.listCollections().toArray()).toEqual([]);

  });

  it('should insert a document into designated collection', async () => {

    const mockUser = {
      "username": "testuser",
      "password": "password",
      "email": "testuser@test.com",
      "validated": false,
      "admin": false,
      "createAt": new Date(),
      "updatedAt": new Date(),
    }

    await db.collection("users").insertOne(mockUser);

    const insertedDocument = await db.collection("users").findOne({ username: "testuser" });
    expect(insertedDocument).toEqual(mockUser)

  });

});