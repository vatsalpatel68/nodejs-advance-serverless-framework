/* eslint-disable @typescript-eslint/require-await */
import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from 'aws-lambda';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';

type IPayload = {
  email?: string;
  password?: string;
};

const Signup = ({
  clientId,
  poolId,
  email,
  password,
}: {
  clientId: string;
  poolId: string;
  email: string;
  password: string;
}) => {
  return new Promise((res, rej) => {
    const poolData = {
      UserPoolId: poolId,
      ClientId: clientId,
    };
    const attributeList = [];
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const dataEmail = {
      Name: 'email',
      Value: email,
    };
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataEmail,
    );
    attributeList.push(attributeEmail);
    userPool.signUp(email, password, attributeList, [], (err, data) => {
      if (err) {
        console.log('ERROR Is', err);
        rej(err);
      }
      console.log('Success is', data);
      res(data);
    });
  });
};

export async function main(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  const {clientId, poolId} = process.env;
  if (!event.body) {
    return {
      statusCode: 422,
      body: 'Invalid Email and password',
    };
  }
  const {email, password} = JSON.parse(event.body) as IPayload;

  if (!email) {
    return {
      statusCode: 422,
      body: 'Invalid email',
    };
  }
  if (!password) {
    return {
      statusCode: 422,
      body: 'Invalid password',
    };
  }
  if (!clientId || !poolId) {
    return {
      statusCode: 500,
      body: 'Server error',
    };
  }
  try {
    const token = await Signup({
      clientId,
      poolId,
      email,
      password,
    });
    console.log('Token is', token);
    return {
      statusCode: 200,
      body: 'Login successfully',
    };
  } catch (err) {
    console.log('ERROR is', err);
    return {
      statusCode: 400,
      body: 'Error encounter',
    };
  }
}
