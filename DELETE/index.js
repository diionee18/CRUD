const AWS = require('aws-sdk');
const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-north-1' });

exports.handler = async (event) => {
    
    const { BookName } = event.body; // Ta emot bokens namn

    // Sök efter böcker som matchar det angivna namnet
    const searchParams = {
        TableName: 'Books',
        FilterExpression: 'BookName = :bookName',
        ExpressionAttributeValues: {
            ':bookName': BookName
        }
    };

    try {
        const searchResult = await dynamoClient.scan(searchParams).promise();

        if (searchResult.Items.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify('Book not found')
            };
        }

        // Ta bort alla böcker som matchar namnet
        for (const book of searchResult.Items) {
            const deleteParams = {
                TableName: 'Books',
                Key: {
                    "BookId": book.BookId
                }
            };
            await dynamoClient.delete(deleteParams).promise();
        }

        return {
            statusCode: 204, // 204 betyder "No Content", eftersom böckerna har tagits bort
            body: ''
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error deleting book: ' + error.message)
        };
    }
};
