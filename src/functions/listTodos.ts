import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const response = await document.query({
    TableName: "todos",
    IndexName: "UserIdIndex",
    KeyConditionExpression: "user_id = :userid",
    ExpressionAttributeValues: {
      // "userid": {"S": "f9e58fe6-848e-41e2-98c1-0f9eb9fbda0c"}
      ":userid": userid
    }
  }).promise();

  const todos = response;

  if (todos) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        todos,
      ),
      headers: {
        "Content-type": "application/json",
      },
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Invalid User!",
    }),
  };
};
