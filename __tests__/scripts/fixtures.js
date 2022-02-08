require('dotenv').config();
const { MongoClient } = require('mongodb');
const data = require('../../data.json');
const argon2 = require('argon2');

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

  it('should insert documents into designated collection', async () => {

    const { User } = data;

    for (const user of User) {
      await db.collection("users").insertOne({
        "username": user.username,
        "password": await argon2.hash(user.password, process.env.ARGON_SECRET_HASH),
        "email": user.email,
        "validated": user.validated,
        "admin": user.admin,
        "createAt": new Date(),
        "updatedAt": new Date(),
      })
    }

    const insertedDocument = await db.collection("users").findOne({ username: "admintest" });
    expect(insertedDocument.username).toEqual("admintest")

  });

});