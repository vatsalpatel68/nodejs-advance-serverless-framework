var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/lambdas/auth/signup.ts
__markAsModule(exports);
__export(exports, {
  main: () => main
});
var import_aws_sdk = __toModule(require("aws-sdk"));
async function main(event) {
  const {clientId} = process.env;
  if (!event.body) {
    return {
      statusCode: 422,
      body: "Invalid Email and password"
    };
  }
  const {email, password} = JSON.parse(event.body);
  if (!email) {
    return {
      statusCode: 422,
      body: "Invalid email"
    };
  }
  if (!password) {
    return {
      statusCode: 422,
      body: "Invalid password"
    };
  }
  if (!clientId) {
    return {
      statusCode: 500,
      body: "Server error"
    };
  }
  const provider = new import_aws_sdk.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18"
  });
  const params = {
    ClientId: clientId,
    Username: email,
    Password: password
  };
  provider.signUp(params, (err, data) => {
    if (err) {
      console.log("ERROR is", err);
      return {
        statusCode: 422,
        body: JSON.stringify({
          error: err.message
        }),
        headers: {
          "content-type": "application/json"
        }
      };
    }
    console.log("Data is", data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json"
      }
    };
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
