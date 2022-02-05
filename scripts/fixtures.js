require('dotenv').config();
const { MongoClient } = require("mongodb");
const data = require('../data.json');
const argon2 = require('argon2');

(async () => {

  try {

    const client = new MongoClient(process.env.DB_URI + process.env.DB_USER_PASSWORD + "@cluster0.b858k.mongodb.net/" + process.env.DB_PROJECT_NAME);

    const dbName = process.env.DB_PROJECT_NAME;
    const db = client.db(dbName);

    // connect
    await client.connect();
    console.log("Atlas DB Auth succeeded - Connected");

    // cleaning
    console.log("Cleaning database");
    const colls = await db.listCollections().toArray();
    colls.forEach( coll => {
      console.log("Deleting", coll.name, "collection…");
      db.collection(coll.name).drop();
    });

    // inserts
    console.log('Processing data.json - Importing User collection…');

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

    await client.close();

  } catch (e) {
    console.log(e)
  } finally {
    console.log('Seeding OK')
  }

})();