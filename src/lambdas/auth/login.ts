/* eslint-disable @typescript-eslint/require-await */
import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from 'aws-lambda';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';

type IPayload = {
  email?: string;
  password?: string;
};

const login = ({
  clientId,
  poolId,
  email,
  password,
}: {
  clientId: string;
  poolId: string;
  email: string;
  password: string;
}): Promise<string> => {
  return new Promise((res, rej) => {
    const authenticationData: {
      Username: string;
      Password: string;
    } = {
      Username: email,
      Password: password,
    };
    console.log('Reached');
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData,
    );
    console.log({authenticationDetails});
    const poolData = {
      UserPoolId: poolId,
      ClientId: clientId,
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    console.log({userPool});
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    console.log({cognitoUser});
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        const accessToken = result.getAccessToken().getJwtToken();

        res(accessToken);
      },

      onFailure: err => {
        console.log('ERROR is', err);
        rej(err);
      },
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
    const token: string = await login({
      clientId,
      poolId,
      email,
      password,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
      }),
      headers: {
        'content-type': 'application/json',
      },
    };
  } catch (err) {
    console.log('ERROR is', err);
    return {
      statusCode: 400,
      body: 'Error encounter',
    };
  }
}
