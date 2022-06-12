/* eslint-disable @typescript-eslint/require-await */
import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from 'aws-lambda';

export async function main(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  console.log('event is', event);
  return {
    body: JSON.stringify({message: 'Protected Route'}),
    statusCode: 200,
  };
}
