const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.DB_URI + process.env.DB_USER_PASSWORD + "@cluster0.b858k.mongodb.net/" + process.env.DB_PROJECT_NAME,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Atlas DB Auth succeeded - Connected"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));