const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors')
const router = require('./router')

// swagger UI init
const swaggerUi = require('swagger-ui-express'),
YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mongo DB Atlas client
require('./database/atlas');

// * wildcard / no whitelist, CORS-enabled for all origins for convenience 
app.use(cors())

// built-in parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// router
app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`OpenAPI documentation available in /api-docs`);
});
