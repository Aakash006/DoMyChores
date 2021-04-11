'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

/* This function will allow the user to login to the application. */
module.exports.login = async (event, context, callback) => {
    const requestBody = JSON.parse(event.body);

    // initialize the response with headers
    const response = {
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        },
    };

    // configure the parameters to query the database
    const params = {
        TableName: 'users',
        FilterExpression: '#username = :username AND #password = :password',
        ExpressionAttributeNames: {
            '#username': 'username',
            '#password': 'password',
        },
        ExpressionAttributeValues: {
            ':username': requestBody.username,
            ':password': requestBody.password,
        },
        ProjectionExpression: 'username, email, userType, id',
    };

    // query dynamodb to scan the username and password in the specified table name
    await db
        .scan(params)
        .promise()
        .then((res) => {
            if (res.Count == 1) {
                response.statusCode = 200;
                response.body = JSON.stringify(res.Items[0]);
                callback(null, response);
            } else {
                response.statusCode = 404;
                response.body = JSON.stringify({ msg: 'No accounts found.' });
                callback(null, response);
            }
        })
        .catch((err) => {
            response.statusCode = 500;
            response.body = JSON.stringify({ msg: 'Internal Server Error' });
            callback(null, response);
        });
};

/* This function will allow the user to register a user to the application. */
module.exports.register = async (event, context, callback) => {
    const requestBody = JSON.parse(event.body);

    // initialize the response with headers
    const response = {
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        },
    };

    // configure the parameters to create a new user entry in the database
    const params = {
        TableName: 'users',
        Item: {
            id: uuid.v1(),
            username: requestBody.username,
            email: requestBody.email,
            userType: requestBody.userType,
            password: requestBody.password,
        },
    };

    // query a create request to the dynamodb to create a new user entry in the specified table
    await db
        .put(params)
        .promise()
        .then((res) => {
            response.statusCode = 200;
            response.body = JSON.stringify({ msg: 'Good' });
            callback(null, response);
        })
        .catch((err) => {
            response.statusCode = 500;
            response.body = JSON.stringify({ msg: 'Internal Server Error' });
            callback(null, response);
        });
};
