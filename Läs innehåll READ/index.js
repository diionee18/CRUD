const AWS = require('aws-sdk');
const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-north-1' });

exports.handler = async (event, context, callback) => {

    const params = {
        TableName: 'Books',
    };

    return dynamoClient.scan(params).promise().then((Books) => {
        callback(null,{
            statusCode: 200,
            body: Books.Items
        });
    }) .catch((err) =>{
        console.error(err);
    })
};