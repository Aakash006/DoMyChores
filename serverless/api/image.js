'use strict'
const uuid = require('uuid')
const AWS = require('aws-sdk')
const s3 = new AWS.S3();
const fileType = require('file-type')
const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];

module.exports.upload = async(event, context, callback) => {
    const response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    };

    try {
        const requestBody = JSON.parse(event.body);

        if(!requestBody || !requestBody.image) {
            response.statusCode = 400
            response.body = JSON.stringify({ msg: 'Incorrect body...', err: err})
            callback(null, response)
        }

        let imgData = requestBody.image;
        if (requestBody.image.substr(0, 7) === 'base64,') {
            imgData = requestBody.image.substr(7, requestBody.image.length);
        }

        const imgBuffer = Buffer.from(imgData, 'base64');
        const imgInfo = await fileType.fromBuffer(imgBuffer);
        const detectedExt = imgInfo.ext;
        const detectedMime = imgInfo.mime;
        
        if(!allowedMimes.includes(detectedMime)) {
            response.statusCode = 400
            response.body = JSON.stringify({ msg: 'Incorrect image format...'})
            callback(null, response)
        }

        const name = uuid.v1();
        const key = `${name}.${detectedExt}`;
        const url = `https://${process.env.imageUploadBucket}.s3.amazonaws.com/${key}`;

        await s3
            .putObject({
                Body: imgBuffer,
                Key: key,
                ContentType: requestBody.mime,
                Bucket: process.env.imageUploadBucket,
                ACL: 'public-read',
            })
            .promise()
            .then(res => {
                response.statusCode = 200
                response.body = JSON.stringify({ msg: 'Image uploaded successfully!', url:url})
                callback(null, response)
            })
            .catch(err => {
                response.statusCode = 500
                response.body = JSON.stringify({ msg: 'Internal Server Error, failed to upload image!', err: err})
                callback(null, response)
            })

    } catch(err) {
        console.log('error', err);

        response.statusCode = 500
        response.body = JSON.stringify({ msg: 'Internal Server Error, failed to upload image', err: err })
        callback(null, response)
    }
};