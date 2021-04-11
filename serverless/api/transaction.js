'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

/* This function will allow the user to fetch all the requests. */
module.exports.getAllRequest = async (event, context, callback) => {
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
        TableName: 'transactions',
    };

    // query dynamodb to fetch all the requests
    await db
        .scan(params)
        .promise()
        .then((res) => {
            if (res.Count > 0) {
                response.statusCode = 200;
                response.body = JSON.stringify(res.Items);
                callback(null, response);
            } else {
                response.statusCode = 404;
                response.body = JSON.stringify({
                    msg: 'No transactions found.',
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

/* This function will allow the user to fetch all the request associated to a user. */
module.exports.getRequestPerUser = async (event, context, callback) => {
    const requestParam = event['queryStringParameters'];

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
        TableName: 'transactions',
        FilterExpression:
            '#requesterUserName = :requesterUserName OR #taskerUserName = :taskerUserName',
        ExpressionAttributeNames: {
            '#requesterUserName': 'requesterUserName',
            '#taskerUserName': 'taskerUserName',
        },
        ExpressionAttributeValues: {
            ':requesterUserName': requestParam['requesterUserName']
                ? requestParam['requesterUserName']
                : '',
            ':taskerUserName': requestParam['taskerUserName']
                ? requestParam['taskerUserName']
                : '',
        },
    };

    // query dynamodb to fetch all the requests associated a user
    await db
        .scan(params)
        .promise()
        .then((res) => {
            if (res.Count > 0) {
                response.statusCode = 200;
                response.body = JSON.stringify(res.Items);
                callback(null, response);
            } else {
                response.statusCode = 404;
                response.body = JSON.stringify({
                    msg: 'No transactions found.',
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

/* This function will allow the user to create a request. */
module.exports.createRequest = async (event, context, callback) => {
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
        TableName: 'transactions',
        Item: {
            id: reqId,
            requesterUserName: requestBody.requesterUserName,
            requestedFor: requestBody.requestDate,
            address: requestBody.address,
            taskerUserName: '',
            submissionDate: new Date().toISOString(),
            status: 'REQUESTED',
            acceptedTimeStamp: '',
            statusChangeTimeStamp: new Date().toISOString(),
            completedTimeStamp: '',
            requestedTasks: requestBody.requestedTasks,
            completedTasks: [],
            extraNotes: requestBody.extraNotes,
            price: requestBody.price,
        },
    };

    // query dynamodb to insert a new request
    await db
        .put(params)
        .promise()
        .then((res) => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                success: true,
                msg: 'Service request has been submitted!',
                id: reqId,
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

/* This function will allow the user to delete a request. */
module.exports.deleteRequest = async (event, context, callback) => {
    const requestBody = JSON.parse(event.body);

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
        TableName: 'transactions',
        Key: { id: event.pathParameters.id },
    };

    // query dynamodb to delete a request
    await db
        .delete(params)
        .promise()
        .then((res) => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                success: true,
                msg: 'Service request has been removed',
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

/* This function will allow the user to get the status of a request. */
module.exports.getStatus = async (event, context, callback) => {
    const requestParam = event.pathParameters.id;

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
        TableName: 'transactions',
        Key: {
            id: requestParam,
        },
    };

    // query dynamodb to get the status of a request 
    await db
        .get(params)
        .promise()
        .then((res) => {
            if (res.Item) {
                response.statusCode = 200;
                response.body = JSON.stringify({ status: res.Item.status });
                callback(null, response);
            } else {
                response.statusCode = 404;
                response.body = JSON.stringify({
                    msg: 'No transactions found.',
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

/* This function will allow the user to accept a task associated to a request. */
module.exports.taskerAccept = async (event, context, callback) => {
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
        TableName: 'transactions',
        Key: {
            id: requestBody.id,
        },
        UpdateExpression:
            'set taskerUserName = :taskerUserName, #status = :status, acceptedTimeStamp = :acceptedTimeStamp, statusChangeTimeStamp = :statusChangeTimeStamp',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: {
            ':taskerUserName': requestBody.taskerUserName,
            ':status': 'ACCEPTED',
            ':acceptedTimeStamp': new Date().toISOString(),
            ':statusChangeTimeStamp': new Date().toISOString(),
        },
    };

    // query dynamodb to update a task in a request
    await db
        .update(params)
        .promise()
        .then((res) => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                success: true,
                msg: 'Transaction updated.',
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

/* This function will allow the user to complete a task. */
module.exports.taskerSetCompleteTask = async (event, context, callback) => {
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
        TableName: 'transactions',
        Key: {
            id: requestBody.id,
        },
        UpdateExpression:
            'set #status = :status, completedTimeStamp = :completedTimeStamp, statusChangeTimeStamp = :statusChangeTimeStamp',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: {
            ':status': 'DONE',
            ':completedTimeStamp': new Date().toISOString(),
            ':statusChangeTimeStamp': new Date().toISOString(),
        },
    };

    // query dynamodb to update a request
    await db
        .update(params)
        .promise()
        .then((res) => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                success: true,
                msg: 'Transaction updated.',
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
