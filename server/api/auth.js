'use strict'
const uuid = require('uuid')
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

module.exports.login = async(event, context, callback) => {
    const requestBody = JSON.parse(event.body)
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
            const response = {
                statusCode: 200,
                body: JSON.stringify({ id: res.Item.id })
            }
            callback(null, response)
        } else {
            const response = {
                statusCode: 404,
                body: JSON.stringify({ msg: 'Account Not Found.'})
            }
            callback(null, response)
        }
    })
    .catch(err => {
        const response = {
            statusCode: 404,
            body: JSON.stringify(err),
        }
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