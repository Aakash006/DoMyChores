'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

/* This function will allow the user to fetch a certain user profile from the server. */
module.exports.getProfileUsername = async (event, context, callback) => {
    // initialize the response with headers
    const response = {
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        },
    };

    const userName = event.pathParameters.username;

    // configure the parameters to query the database
    const params = {
        TableName: 'users',
        Key: {
            username: userName,
        },
        ProjectionExpression: 'username, email, userType, id',
    };

    // query dynamodb to get the specified user profile
    await db
        .get(params)
        .promise()
        .then((res) => {
            if (res.Item) {
                response.statusCode = 200;
                response.body = JSON.stringify(res.Item);
                callback(null, response);
            } else {
                response.statusCode = 404;
                response.body = JSON.stringify({
                    msg: 'No profile found.',
                    err: err,
                });
                callback(null, response);
            }
        })
        .catch((err) => {
            response.statusCode = 500;
            response.body = JSON.stringify({
                msg: 'Internal Server Error',
                err: err,
            });
            callback(null, response);
        });
};
