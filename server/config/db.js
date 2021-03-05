const mongoose = require('mongoose');
require('dotenv').config();

//connect to the database
const mongoConnect = () => {
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => {
            console.log('Database connected successfully!');
        })
        .catch((err) => console.error('could not connect to mongo DB', err));
};

// export the DB connection
exports.mongoConnect = mongoConnect;
