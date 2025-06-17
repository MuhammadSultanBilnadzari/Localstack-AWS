import { DynamoDB } from 'aws-sdk';

export const handler = async (event?: { queryStringParameters?: any }) => {
  try {
    const tableName = process.env.TABLE_NAME!;
    const awsRegion = process.env.REGION || 'us-east-1';

    const dynamoDB = new DynamoDB.DocumentClient({
      region: awsRegion,
      endpoint: process.env.DYNAMODB_ENDPOINT || `https://dynamodb.${awsRegion}.amazonaws.com`,
    });

    const query = event?.queryStringParameters;

    // ✅ Get by ID
    if (query?.id) {
      const result = await dynamoDB.get({
        TableName: tableName,
        Key: { id: query.id },
      }).promise();

      return {
        statusCode: 200,
        body: JSON.stringify(result.Item || { message: `Todo with id ${query.id} not found.` }),
      };
    }

    // ✅ Get by todo_name
    if (query?.todo_name) {
      const result = await dynamoDB.scan({
        TableName: tableName,
        FilterExpression: 'todo_name = :name',
        ExpressionAttributeValues: {
          ':name': query.todo_name,
        },
      }).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ todos: result.Items }),
      };
    }

    // ✅ Get all
    const { Items } = await dynamoDB.scan({ TableName: tableName }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ todos: Items }),
    };
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
