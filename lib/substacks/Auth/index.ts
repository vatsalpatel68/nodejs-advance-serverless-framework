import {LambdaIntegration, RestApi} from '@aws-cdk/aws-apigateway';
import {Construct, Duration, NestedStack, Stack} from '@aws-cdk/core';
import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import {getCommonLambdaFunctionConfigurations} from '../../../src/constants/stack';
import path from 'path';
import {
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
} from '@aws-cdk/aws-cognito';

interface IProps {
  API: RestApi;
}

export class AuthStack extends NestedStack {
  private signupFunc: NodejsFunction;
  private loginFunc: NodejsFunction;
  private userPool: UserPool;
  private userPoolClientId: string;
  private userPoolClientName: string;
  private userPoolId: string;
  constructor(scope: Construct, id: string, props: IProps) {
    super(scope, id);
    /**
     * Get API object from parent class.
     */
    const {API} = props;

    const preSignupTrigger = new NodejsFunction(this, 'preSignupTrigger', {
      ...getCommonLambdaFunctionConfigurations({}),
      functionName: 'preSignupTrigger',
      entry: path.join(
        __dirname,
        '../../../src/lambdas/auth/preSignUpTrigger.ts',
      ),
    });

    const pool = new UserPool(this, 'CDK', {
      userPoolName: 'CDK',
      signInAliases: {
        username: true,
      },
      selfSignUpEnabled: true,
      lambdaTriggers: {
        preSignUp: preSignupTrigger,
      },
    });

    this.userPool = pool;
    this.userPoolId = pool.userPoolId;

    const cognitoUserClient = pool.addClient('CDK', {
      accessTokenValidity: Duration.minutes(60),
      refreshTokenValidity: Duration.minutes(10 * 60),
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      userPoolClientName: 'CDK',
    });

    this.userPoolClientId = cognitoUserClient.userPoolClientId;
    this.userPoolClientName = cognitoUserClient.userPoolClientName;

    /**
     * Create an Signup lambda.
     */
    this.signupFunc = new NodejsFunction(this, 'Signup', {
      ...getCommonLambdaFunctionConfigurations({}),
      functionName: 'Signup',
      entry: path.join(__dirname, '../../../src/lambdas/auth/signup.ts'),
      environment: {
        clientId: this.userPoolClientId,
        clientName: this.userPoolClientName,
        poolId: this.userPoolId,
      },
      timeout: Duration.seconds(10),
      bundling: {
        minify: false,
        externalModules: ['aws-sdk'],
        nodeModules: ['amazon-cognito-identity-js'],
      },
    });

    this.loginFunc = new NodejsFunction(this, 'login', {
      ...getCommonLambdaFunctionConfigurations({}),
      functionName: 'Login',
      entry: path.join(__dirname, '../../../src/lambdas/auth/login.ts'),
      environment: {
        clientId: this.userPoolClientId,
        poolId: this.userPoolId,
      },
      timeout: Duration.seconds(10),
      bundling: {
        minify: false,
        externalModules: ['aws-sdk'],
        nodeModules: ['amazon-cognito-identity-js'],
      },
    });

    /**
     * Define route to sign up lambda.
     */
    const auth = API.root.addResource('auth');
    const signup = auth.addResource('signup');
    const login = auth.addResource('login');
    signup.addMethod('POST', new LambdaIntegration(this.signupFunc, {}));
    login.addMethod('POST', new LambdaIntegration(this.loginFunc, {}));
  }

  public getUserPool = () => {
    return this.userPool;
  };
}
