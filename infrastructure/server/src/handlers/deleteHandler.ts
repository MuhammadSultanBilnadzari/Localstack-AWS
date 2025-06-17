import { DynamoDB } from 'aws-sdk';

export const deleteHandler = async (id: string) => {
  try {
    const tableName = process.env.TABLE_NAME!;
    const awsRegion = process.env.REGION || 'us-east-1';

    const dynamoDB = new DynamoDB.DocumentClient({
      region: awsRegion,
      endpoint: process.env.DYNAMODB_ENDPOINT || `https://dynamodb.${awsRegion}.amazonaws.com`,
    });

    await dynamoDB.delete({
      TableName: tableName,
      Key: { id },
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Todo with id ${id} deleted.` }),
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
