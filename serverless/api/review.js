'use strict'
const uuid = require('uuid')
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

module.exports.addReview = async(event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    };
    
    let reqId = uuid.v1();
    const params = {
        TableName: 'reviews',
        Item: {
            id: reqId,
            fromUsername: requestBody.fromUsername,
            toUsername: requestBody.toUsername,
            datePosted: new Date().toISOString(),
            pictureLinks: requestBody.pictureLinks,
            ratings: requestBody.ratings
        }
    };

    await db.put(params).promise()
        .then(res => {
            response.statusCode = 200
            response.body = JSON.stringify({ msg: "Review successfully added!", id: res.id })
            callback(null, response)
        })
        .catch(err => {
            response.statusCode = 500
            response.body = JSON.stringify({ msg: 'Internal Server Error', err: err})
            callback(null, response)
        })
};

module.exports.getReviewsUsingUsername = async(event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    };
    
    const userName = event.pathParameters.username;
    const params = {
        TableName: 'reviews',
        FilterExpression: '#toUsername = :toUsername',
        ExpressionAttributeNames: {'#toUsername': 'toUsername'},
        ExpressionAttributeValues: {':toUsername': userName}
    };

    await db.scan(params).promise()
        .then(res => {
            if (res.Count > 0) {
                response.statusCode = 200
                response.body = JSON.stringify(res.Items)
                callback(null, response)
            } else {
                response.statusCode = 404
                response.body = JSON.stringify({ msg: 'No reviews found.'})
                callback(null, response)
            }
        })
        .catch(err => {
            response.statusCode = 500
            response.body = JSON.stringify({ msg: 'Internal Server Error', err: err})
            callback(null, response)
        })
};

module.exports.deleteReview = async(event, context, callback) => {
    const response = {
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE"
        }
    }
    const params = {
        TableName: 'reviews',
        Key: { id: event.pathParameters.id }
    };
    await db.delete(params).promise()
        .then(res => {
            response.statusCode = 200
            response.body = JSON.stringify({ msg: 'Service request has been removed'})
            callback(null, response)
        })
        .catch(err => {
            response.statusCode = 500
            response.body = JSON.stringify({ msg: 'Internal Server Error', err: err})
            callback(null, response)
        })
};
