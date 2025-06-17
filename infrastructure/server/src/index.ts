import express from 'express';
import { config } from 'dotenv';
import { DynamoDB } from 'aws-sdk';

import { handler as postHandler } from './handlers/postHandler';
import { handler as getHandler } from './handlers/getHandler';
import { deleteHandler } from './handlers/deleteHandler';

config();

const app = express();
app.use(express.json());

// healthcheck endpoint
app.get('/healthcheck', (_, res) => {
  res.json({ status: 'ok' });
});

// create todo
app.post('/', async (req, res) => {
  const result = await postHandler({
    body: JSON.stringify(req.body),
  } as any);
  res.status(result.statusCode).json(JSON.parse(result.body));
});

// get all / get by id / get by name via query (?id=... or ?todo_name=...)
app.get('/', async (req, res) => {
  const result = await getHandler({
    queryStringParameters: req.query,
  });
  res.status(result.statusCode).json(JSON.parse(result.body));
});

// delete by id only
app.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // basic id format validation (UUID-like)
  if (!/^[\w-]{10,}$/.test(id)) {
    return res.status(400).json({ message: 'Invalid ID format. Only deletion by ID is allowed.' });
  }

  const result = await deleteHandler(id);
  res.status(result.statusCode).json(JSON.parse(result.body));
});

// get by path param (name or id)
app.get('/:param', async (req, res) => {
  const { param } = req.params;
  const tableName = process.env.TABLE_NAME!;
  const awsRegion = process.env.REGION || 'us-east-1';

  const dynamoDB = new DynamoDB.DocumentClient({
    region: awsRegion,
    endpoint: process.env.DYNAMODB_ENDPOINT || `https://dynamodb.${awsRegion}.amazonaws.com`,
  });

  try {
    // Jika param terlihat seperti UUID, cari berdasarkan ID
    if (/^[\w-]{10,}$/.test(param)) {
      const result = await dynamoDB.get({
        TableName: tableName,
        Key: { id: param },
      }).promise();

      return res.status(200).json(result.Item || { message: `Todo with id '${param}' not found.` });
    }

    // Jika bukan, anggap param sebagai todo_name
    const result = await dynamoDB.scan({
      TableName: tableName,
      FilterExpression: 'todo_name = :name',
      ExpressionAttributeValues: {
        ':name': param,
      },
    }).promise();

    return res.status(200).json({ todos: result.Items });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
