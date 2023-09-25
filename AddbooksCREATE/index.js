const AWS = require('aws-sdk');
const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-north-1' });

exports.handler = async (event) => {
   
    const { BookName, Author } = JSON.parse(event.body);

    const params = {
        TableName: 'Books',
        Item: {
            "BookId": AWS.util.uuid.v4(),
            "BookName": BookName, 
            "Author": Author 
        }
    };

    try {
        await dynamoClient.put(params).promise();
        return {
            statusCode: 201,
            body: ''
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error creating book: ' + error.message)
        };
    }
};

