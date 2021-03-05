const express = require('express');
const jwt = require('jsonwebtoken');
const Service = require('../models/user');

const router = express.Router();

// this endpoint will expose all the service item that are associated with the user, requires jwt token
router.get("/get-services", (req, res, next) => {
    if (req.header('authorization')) {
        token = req.header('authorization');
        var decodedToken = jwt.verify(token, process.env.JWT_KEY || 'secret-key');

        Service.find({ service_owner: decodedToken.iss_id })
            .then((data) => res.status(200).json(data))
            .catch(next);
    } else {
        res.status(400).json({
            status: 'bad request',
            error: 'Token not provided...'
        }); //otherwise display error
    }
});

module.exports = router;