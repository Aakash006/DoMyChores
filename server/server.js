const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoConnect = require('./config/db.js').mongoConnect;
const routes = require('./routes/routes');
const auth = require('./routes/auth');

require('dotenv').config();

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3081;

mongoConnect(); // call for database connection

app.use(cors()); // use cors

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
); // do not allow for parsing of application/x-www-form-urlencoded post data

app.use(bodyParser.json()); // support parsing of application/json type post data

app.use('/api/auth', auth); // attach auth route to /api/auth
app.use('/api', routes); // attach server based routes to /api

app.listen(port, () => {
    console.log(`Server ready on http://${host}:${port}/...`);
}); // listen for service on specified port
