const mongoose = require('mongoose');
require('dotenv').config();

//connect to the database
const mongoConnect = () => {
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
        })
        .then(() => {
            console.log('Database connected successfully!');
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

// export the DB connection
exports.mongoConnect = mongoConnect;
