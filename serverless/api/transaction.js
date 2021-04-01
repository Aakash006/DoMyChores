'use strict'
const uuid = require('uuid')
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

module.exports.getAllRequest = async(event, context, callback) => {

    const response = {
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    }
    const params = {
        TableName: 'transactions'
    };
    await db.scan(params).promise()
        .then(res => {
            if (res.Count > 0) {
                response.statusCode = 200
                response.body = JSON.stringify(res.Items)
                callback(null, response)
            } else {
                response.statusCode = 404
                response.body = JSON.stringify({ msg: 'No transactions found.'})
                callback(null, response)
            }
        })
        .catch(err => {
            response.statusCode = 500
            response.body = JSON.stringify({ msg: 'Internal Server Error', err: err})
            callback(null, response)
        })
};

module.exports.getRequestPerUser = async(event, context, callback) => {
    const requestParam = event['queryStringParameters']
    const response = {
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    }
    const params = {
        TableName: 'transactions',
        FilterExpression: '#requesterUserName = :requesterUserName OR #taskerUserName = :taskerUserName',
        ExpressionAttributeNames: {
            '#requesterUserName': 'requesterUserName',
            '#taskerUserName': 'taskerUserName'
        },
        ExpressionAttributeValues: {
            ':requesterUserName': (requestParam['requesterUserName']) ? requestParam['requesterUserName'] : '',
            ':taskerUserName': (requestParam['taskerUserName']) ? requestParam['taskerUserName'] : ''
        }
    };
    await db.scan(params).promise()
        .then(res => {
            if (res.Count > 0) {
                response.statusCode = 200
                response.body = JSON.stringify(res.Items)
                callback(null, response)
            } else {
                response.statusCode = 404
                response.body = JSON.stringify({ msg: 'No transactions found.'})
                callback(null, response)
            }
        })
        .catch(err => {
            response.statusCode = 500
            response.body = JSON.stringify({ msg: 'Internal Server Error', err: err})
            callback(null, response)
        })
};

module.exports.createRequest = async (event, context, callback) => {
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
        TableName: 'transactions',
        Item: {
            id: reqId,
            requesterUserName: requestBody.requesterUserName,
            requestedFor: requestBody.requestDate,
            taskerUserName: '',
            submissionDate: new Date().toISOString(),
            status: 'REQUESTED',
            acceptedTimeStamp: '',
            statusChangeTimeStamp: new Date().toISOString(),
            completedTimeStamp: '',
            requestedTasks: requestBody.requestedTasks,
            completedTasks: [],
            extraNotes: requestBody.extraNotes,
            price: requestBody.price
        }
    };

    await db.put(params).promise()
        .then(res => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                msg: 'Service request has been submitted!',
                id: reqId
            });
            callback(null, response);
        })
        .catch(err => {
            response.statusCode = 500;
            response.body = JSON.stringify({
                msg: 'Internal Server Error',
                err: err
            });
            callback(null, response);
        });
};

module.exports.deleteRequest = async(event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const response = {
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE"
        }
    }
    const params = {
        TableName: 'transactions',
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

module.exports.getStatus = async(event, context, callback) => {
    const requestParam = event.pathParameters.id
    const response = {
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    }
    const params = {
        TableName: 'transactions',
        Key: {
            id : requestParam
        }
    };
    await db.get(params).promise()
        .then(res => {
            if (res.Item) {
                response.statusCode = 200
                response.body = JSON.stringify({ status: res.Item.status })
                callback(null, response)
            } else {
                response.statusCode = 404
                response.body = JSON.stringify({ msg: 'No transactions found.'})
                callback(null, response)
            }
        })
        .catch(err => {
            response.statusCode = 500
            response.body = JSON.stringify({ msg: 'Internal Server Error', err: err})
            callback(null, response)
        })
};

module.exports.taskerAccept = async(event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const response = {
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    }
    const params = {
        TableName: 'transactions',
        Key: {
            id : requestBody.id
        },
        UpdateExpression: 'set taskerUserName = :taskerUserName, #status = :status, acceptedTimeStamp = :acceptedTimeStamp, statusChangeTimeStamp = :statusChangeTimeStamp',
        ExpressionAttributeNames: {'#status' : 'status'},
        ExpressionAttributeValues: { 
            ':taskerUserName': requestBody.taskerUserName,
            ':status': 'ACCEPETED',
            ':acceptedTimeStamp': new Date().toISOString(),
            ':statusChangeTimeStamp': new Date().toISOString()
        }
    };
    await db.update(params).promise()
        .then(res => {
            response.statusCode = 200
            response.body = JSON.stringify({ msg: 'Transaction updated.'})
            callback(null, response)
        })
        .catch(err => {
            response.statusCode = 500
            response.body = JSON.stringify({ msg: 'Internal Server Error', err: err})
            callback(null, response)
        })
};

module.exports.taskerSetCompleteTask = async(event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const response = {
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    }
    const params = {
        TableName: 'transactions',
        Key: {
            id : requestBody.id
        },
        UpdateExpression: 'set taskerUserName = :taskerUserName, #status = :status, acceptedTimeStamp = :acceptedTimeStamp, statusChangeTimeStamp = :statusChangeTimeStamp',
        ExpressionAttributeNames: {'#status' : 'status'},
        ExpressionAttributeValues: { 
            ':taskerUserName': requestBody.taskerUserName,
            ':status': 'DONE',
            ':completedTimeStamp': new Date().toISOString(),
            ':statusChangeTimeStamp': new Date().toISOString()
        }
    };
    await db.update(params).promise()
        .then(res => {
            response.statusCode = 200
            response.body = JSON.stringify({ msg: 'Transaction updated.'})
            callback(null, response)
        })
        .catch(err => {
            response.statusCode = 500
            response.body = JSON.stringify({ msg: 'Internal Server Error', err: err})
            callback(null, response)
        })
};