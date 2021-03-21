'use strict'
const uuid = require('uuid')
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

module.exports.login = async(event, context, callback) => {
    const requestBody = JSON.parse(event.body)
    const response = {
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    }
    const params = {
        TableName: 'users',
        Key: {
            'username': requestBody.username
        },
        AttributesToGet: [
            'password',
            'id'
        ]
    }
    await db.get(params).promise()
    .then(res => {
        if (res.Item.password === requestBody.password) {
            response.statusCode = 200
            response.body = JSON.stringify({ id: res.Item.id })
            callback(null, response)
        } else {
            response.statusCode = 404
            response.body = JSON.stringify({ msg: 'Account Not Found.'})
            callback(null, response)
        }
    })
    .catch(err => {
        response.statusCode = 404
        response.body = JSON.stringify(err)
        callback(null, response)
    })
}

module.exports.register = async(event, context, callback) => {
    const requestBody = JSON.parse(event.body)
    const params = {
        TableName: 'users',
        Item: {
            id: uuid.v1(),
            username: requestBody.username,
            email: requestBody.email,
            user_type: requestBody.user_type,
            password: requestBody.password
        }
    }
    await db.put(params).promise()
    .then(res => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(res),
        }
        callback(null, response)
    })
    .catch(err => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(err),
        }
        callback(null, response)
    })
}