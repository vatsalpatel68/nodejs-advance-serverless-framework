import {NodejsFunction} from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import {
  LambdaIntegration,
  RestApi,
  EndpointType,
  CognitoUserPoolsAuthorizerProps,
  CognitoUserPoolsAuthorizer,
  IdentitySource,
  AuthorizationType,
} from '@aws-cdk/aws-apigateway';
import {getCommonLambdaFunctionConfigurations} from '../src/constants/stack';
import {AuthStack} from './substacks/Auth/index';
import {Duration} from '@aws-cdk/core';

export class CdkStarterStack extends cdk.Stack {
  private httpApi: RestApi;
  private healthFunc: NodejsFunction;
  private protectedFunction: NodejsFunction;
  private authAuthorizer: CognitoUserPoolsAuthorizer | null = null;
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * Create an REST API.
     */
    this.httpApi = new RestApi(this, 'CDK', {
      description: 'Health API',
      endpointConfiguration: {
        types: [EndpointType.EDGE],
      },
    });

    /**
     * Generate a lambda function for health.
     */
    this.healthFunc = new NodejsFunction(this, 'hello', {
      ...getCommonLambdaFunctionConfigurations({}),
      functionName: 'hello',
      entry: path.join(__dirname, `/../src/lambdas/hello/index.ts`),
    });

    /**
     * Define a route for health
     */
    this.httpApi.root.addMethod(
      'GET',
      new LambdaIntegration(this.healthFunc, {}),
    );

    /**
     * Auth stack.
     */
    const authStack = new AuthStack(this, 'health', {
      API: this.httpApi,
    });

    /**
     * Authorizer
     */
    const userPool = authStack.getUserPool();
    this.authAuthorizer = new CognitoUserPoolsAuthorizer(
      this,
      'CDKAuthorizer',
      {
        cognitoUserPools: [userPool],
        authorizerName: 'CDK',
        identitySource: IdentitySource.header('Authorization'),
        resultsCacheTtl: Duration.hours(1),
      },
    );

    /**
     * Generate a Protected function.
     */
    this.protectedFunction = new NodejsFunction(this, 'Protected', {
      ...getCommonLambdaFunctionConfigurations({}),
      functionName: 'Protected',
      entry: path.join(__dirname, `/../src/lambdas/protected/index.ts`),
    });
    const users = this.httpApi.root.addResource('users');
    users.addMethod('GET', new LambdaIntegration(this.healthFunc, {}), {
      authorizer: this.authAuthorizer,
      authorizationType: AuthorizationType.COGNITO,
    });
  }
}
