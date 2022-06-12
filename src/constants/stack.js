import {Runtime} from '@aws-cdk/aws-lambda';
import {Duration} from '@aws-cdk/core';

export const getCommonLambdaFunctionConfigurations = ({
  externalModules = ['aws-sdk'],
}) => {
  return {
    memorySize: 128,
    timeout: Duration.seconds(5),
    runtime: Runtime.NODEJS_14_X,
    handler: 'main',
    bundling: {
      minify: false,
      externalModules,
    },
  };
};
