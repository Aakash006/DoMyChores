const express = require('express');
const jwt = require('jsonwebtoken');
const Service = require('../models/user');

const router = express.Router();

/* this endpoint will expose all the service item that are associated with the user, requires jwt token */
router.get('/', (req, res, next) => {
    if (req.header('authorization')) {
        token = req.header('authorization');
        var decodedToken = jwt.verify(
            token,
            process.env.JWT_KEY || 'secret-key'
        );

        Service.find({ service_owner: decodedToken.iss_id })
            .then((data) => res.status(200).json(data))
            .catch(next);
    } else {
        res.status(400).json({
            status: 'bad request',
            error: 'Token not provided...',
        });
    }
});

/* create request, need header authorization token */
router.post('/create', (req, res, next) => {
    if (req.header('authorization')) {
        token = req.header('authorization');
        var decodedToken = jwt.verify(
            token,
            process.env.JWT_KEY || 'secret-key'
        );

        if (req.body.service) {
            WatchList.create({
                service_type: req.body.service_type,
                special_instruction: req.body.special_instruction,
                date_requested_by: new Date(req.body.date),
                service_owner: decodedToken.iss_id,
            })
                .then((data) =>
                    res.status(201).json({ message: 'successful request submitted', data: data })
                )
                .catch(next);
        } else {
            res.status(400).json({
                error: 'The required field are empty in the body...',
            });
        }
    } else {
        res.status(400).json({
            status: 'bad request',
            message: 'Token not provided...',
        });
    }
});

/* can be used to update instruction, service type, or changing the request to done */
router.post('/update', (req, res, next) => {
    if (req.header('authorization')) {
        token = req.header('authorization');
        var decodedToken = jwt.verify(
            token,
            process.env.JWT_KEY || 'secret-key'
        ); // don't need issue id for this request

        if (req.body) {
            const { _id, ...filteredObject } = req.body;

            WatchList.findByIdAndUpdate(req.body._id, filteredObject, { new: true })
                .then((data) => res.status(201).json({ message: 'successful updated request', data: data }))
                .catch(next);
        } else {
            res.status(400).json({
                error: 'The required fields are empty in the body...',
            });
        }
    } else {
        res.status(400).json({
            status: 'bad request',
            message: 'Token not provided...',
        });
    }
});

/* Delete using the service id */
router.post('/delete', (req, res, next) => {
    if (req.header('authorization')) {
        token = req.header('authorization');
        var decodedToken = jwt.verify(
            token,
            process.env.JWT_KEY || 'secret-key'
        ); // don't need issue id for this request

        WatchList.findOneAndDelete({ _id: req.params.id })
            .then(() => res.status(204).json({ message: 'service request deleted successfully' }))
            .catch((err) => {
                console.log(err)
                next;
            });
    } else {
        res.status(400).json({
            status: 'bad request',
            message: 'Token not provided...',
        });
    }
});

module.exports = router;
