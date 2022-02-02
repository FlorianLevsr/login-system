const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors')
const router = require('./router')

// Mongo DB Atlas client
require('./database/atlas');

// * wildcard / no whitelist, CORS-enabled for all origins for convenience 
app.use(cors())

// built-in parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// router
app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
