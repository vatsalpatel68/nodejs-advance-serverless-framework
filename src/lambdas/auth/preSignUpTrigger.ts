import {PreSignUpTriggerEvent} from 'aws-lambda';

interface ICallback {
  (arg1: unknown, arg2: PreSignUpTriggerEvent): void;
}
export function main(
  event: PreSignUpTriggerEvent,
  context: void,
  callback: ICallback,
) {
  console.log('Event is', event);
  console.log('context is', context);

  // Confirm the user
  event.response.autoConfirmUser = true;

  // Set the email as verified if it is in the request
  if (event.request.userAttributes.hasOwnProperty('email')) {
    event.response.autoVerifyEmail = true;
  }

  // Set the phone number as verified if it is in the request
  if (event.request.userAttributes.hasOwnProperty('phone_number')) {
    event.response.autoVerifyPhone = true;
  }

  // Return to Amazon Cognito
  callback(null, event);
}
