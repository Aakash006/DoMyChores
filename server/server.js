const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoConnect = require('./config/db.js').mongoConnect;
const serviceRequests = require('./routes/serviceRequests');
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

app.use('/api/auth', auth); // attach auth routes to /api/auth
app.use('/api/service-requests', serviceRequests); // attach serviceRequests routes to /api/service-requests

app.listen(port, () => {
    console.log(`Server ready on http://${host}:${port}/...`);
}); // listen for service on specified port
