const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// this endpoint will allow the user to sign up to the service and receive their JWT token
router.post('/signup', (req, res, next) => {
    if (req.body.username) {
        if (req.body.password.length < 6) {
            return res.status(400).json({
                status: 'bad request',
                error: 'Password too small. Should be at least 6 characters',
            });
        }
        User.findOne({ username: req.body.username }, (err, foundUser) => {
            if (err) throw err;
            if (foundUser) {
                return res.status(400).json({
                    status: 'bad request',
                    error: 'username already exists',
                });
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    user_type: req.body.user_type,
                    password: bcrypt.hashSync(req.body.password, 8),
                });
                newUser.save((err, currUser) => {
                    if (err) {
                        console.error(err);
                        return res.status(400).json({
                            status: 'bad request',
                            error: 'something went wrong',
                        });
                    }
                    return res.status(200).json({
                        message: 'user added successfully',
                        token: jwt.sign(
                            {
                                iss_id: currUser._id,
                                iss_username: currUser.username,
                                iss_email: currUser.email,
                                iss_user_type: currUser.user_type,
                            }, process.env.JWT_KEY || 'secret-key'
                        ),
                    });
                });
            }
        }).catch(next);
    } else {
        res.status(400).json({
            status: 'bad request',
            error: 'Invalid form of username/password provided...',
        }); //otherwise display error
    }
});

// this endpoint will allow the user to sign in to the service and receive their JWT token
router.post('/signin', (req, res, next) => {
    if (req.body.username) {
        User.findOne({ username: req.body.username }, (err, foundUser) => {
            if (err) throw err;
            if (!foundUser || !foundUser.comparePassword(foundUser, req.body.password)) {
                return res.status(401).json({
                    status: 'unauthorized',
                    error: 'Invalid username/password',
                });
            }
            return res.status(200).json({
                token: jwt.sign(
                    {
                        iss_id: currUser._id,
                        iss_username: currUser.username,
                        iss_email: currUser.email,
                        iss_user_type: currUser.user_type,
                    },
                    process.env.JWT_KEY || 'secret-key'
                ),
            });
        }).catch(next);
    } else {
        res.status(400).json({
            status: 'bad request',
            error: 'Invalid form of username/password provided...',
        }); //otherwise display error
    }
});

module.exports = router;