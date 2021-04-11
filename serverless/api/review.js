'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

/* This function will allow the user to add a review for a user. */
module.exports.addReview = async (event, context, callback) => {
    const requestBody = JSON.parse(event.body);

    // initialize the response with headers
    const response = {
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        },
    };

    let reqId = uuid.v1();

    // configure the parameters to query the database
    const params = {
        TableName: 'reviews',
        Item: {
            id: reqId,
            fromUsername: requestBody.fromUsername,
            toUsername: requestBody.toUsername,
            datePosted: new Date().toISOString(),
            pictureLinks: requestBody.pictureLinks,
            ratings: requestBody.ratings,
            comment: requestBody.comment,
        },
    };

    // query dynamodb to insert a new review
    await db
        .put(params)
        .promise()
        .then((res) => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                success: true,
                msg: 'Review successfully added!',
                id: res.id,
            });
            callback(null, response);
        })
        .catch((err) => {
            response.statusCode = 500;
            response.body = JSON.stringify({
                success: false,
                msg: 'Internal Server Error',
                err: err,
            });
            callback(null, response);
        });
};

/* This function will allow the user to get all the review associated to a particular user. */
module.exports.getReviewsUsingUsername = async (event, context, callback) => {
    
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
        TableName: 'reviews',
        FilterExpression: '#toUsername = :toUsername',
        ExpressionAttributeNames: { '#toUsername': 'toUsername' },
        ExpressionAttributeValues: { ':toUsername': userName },
    };

    // query dynamodb to fetch all the reviews associated to a user
    await db
        .scan(params)
        .promise()
        .then((res) => {
            if (res.Count > 0) {
                response.statusCode = 200;
                response.body = JSON.stringify({
                    success: true,
                    reviews: res.Items,
                });
                callback(null, response);
            } else {
                response.statusCode = 404;
                response.body = JSON.stringify({
                    success: false,
                    msg: 'No reviews found.',
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

/* This function will allow the user to delete a review using review id. */
module.exports.deleteReview = async (event, context, callback) => {
    
    // initialize the response with headers
    const response = {
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE',
        },
    };

    // configure the parameters to query the database
    const params = {
        TableName: 'reviews',
        Key: { id: event.pathParameters.id },
    };

    // query dynamodb to delete a review
    await db
        .delete(params)
        .promise()
        .then((res) => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                success: true,
                msg: 'Review has been removed',
            });
            callback(null, response);
        })
        .catch((err) => {
            response.statusCode = 500;
            response.body = JSON.stringify({
                success: false,
                msg: 'Internal Server Error',
                err: err,
            });
            callback(null, response);
        });
};
