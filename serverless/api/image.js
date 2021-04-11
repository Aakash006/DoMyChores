'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fileType = require('file-type');
const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png']; // allowed image files

/* This function will allow the user to upload an image the s3 bucket. */
module.exports.upload = async (event, context, callback) => {
    // initialize the response with headers
    const response = {
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        },
    };

    // try parsing the image upload request and upload to the s3 bucket. 
    try {
        const requestBody = JSON.parse(event.body);

        if (!requestBody || !requestBody.image) {
            response.statusCode = 400;
            response.body = JSON.stringify({
                msg: 'Incorrect body...',
                err: err,
            });
            callback(null, response);
        }

        // parse the image object in the request body
        let imgData = requestBody.image;
        if (requestBody.image.substr(0, 7) === 'base64,') {
            imgData = requestBody.image.substr(7, requestBody.image.length);
        }

        const imgBuffer = Buffer.from(imgData, 'base64');
        const imgInfo = await fileType.fromBuffer(imgBuffer); //decrypt base64 image
        const detectedExt = imgInfo.ext;
        const detectedMime = imgInfo.mime;

        if (!allowedMimes.includes(detectedMime)) {
            response.statusCode = 400;
            response.body = JSON.stringify({
                msg: 'Incorrect image format...',
            });
            callback(null, response);
        }

        // configure file info to upload to s3 bucket
        const name = uuid.v1();
        const key = `${name}.${detectedExt}`;
        const url = `https://${process.env.imageUploadBucket}.s3.amazonaws.com/${key}`;

        // insert image to s3 bucket
        await s3
            .putObject({
                Body: imgBuffer,
                Key: key,
                ContentType: requestBody.mime,
                Bucket: process.env.imageUploadBucket,
                ACL: 'public-read',
            })
            .promise()
            .then((res) => {
                response.statusCode = 200;
                response.body = JSON.stringify({
                    msg: 'Image uploaded successfully!',
                    url: url,
                });
                callback(null, response);
            })
            .catch((err) => {
                response.statusCode = 500;
                response.body = JSON.stringify({
                    msg: 'Internal Server Error, failed to upload image!',
                    err: err,
                });
                callback(null, response);
            });
    } catch (err) {
        // throw error if request is not as specified.
        console.log('error', err);

        response.statusCode = 500;
        response.body = JSON.stringify({
            msg: 'Internal Server Error, failed to upload image',
            err: err,
        });
        callback(null, response);
    }
};
