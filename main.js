const app = require("./app");
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const start = (PORT) => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
      console.log(`OpenAPI documentation available in /api-docs`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

start(PORT);