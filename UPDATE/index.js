const AWS = require('aws-sdk');
const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-north-1' });

exports.handler = async (event) => {
    const { OldBookName, NewBookName, NewAuthor } = JSON.parse(event.body);

    // Sök efter böcker som matchar det gamla namnet
    const searchParams = {
        TableName: 'Books',
        FilterExpression: 'BookName = :oldBookName',
        ExpressionAttributeValues: {
            ':oldBookName': OldBookName
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

        // Uppdatera attributen "BookName" och "Author" för alla böcker med det gamla namnet
        for (const book of searchResult.Items) {
            const updateParams = {
                TableName: 'Books',
                Key: {
                    "BookId": book.BookId
                },
                UpdateExpression: 'set BookName = :newBookName, Author = :newAuthor',
                ExpressionAttributeValues: {
                    ':newBookName': NewBookName,
                    ':newAuthor': NewAuthor
                },
                ReturnValues: 'UPDATED_NEW'
            };
            await dynamoClient.update(updateParams).promise();
        }

        return {
            statusCode: 204, 
            body: ''
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error updating book: ' + error.message)
        };
    }
};
