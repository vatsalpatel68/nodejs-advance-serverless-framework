var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// src/lambdas/auth/preSignUpTrigger.ts
__markAsModule(exports);
__export(exports, {
  main: () => main
});
function main(event, context, callback) {
  console.log("Event is", event);
  console.log("context is", context);
  event.response.autoConfirmUser = true;
  if (event.request.userAttributes.hasOwnProperty("email")) {
    event.response.autoVerifyEmail = true;
  }
  if (event.request.userAttributes.hasOwnProperty("phone_number")) {
    event.response.autoVerifyPhone = true;
  }
  callback(null, event);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
