var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// src/lambdas/auth/signup.ts
__markAsModule(exports);
__export(exports, {
  main: () => main
});
async function main(event) {
  const {clientId, clientName} = process.env;
  console.log("First", JSON.parse(JSON.stringify(event.body)));
  if (event.body) {
    console.log("Event body is", typeof JSON.parse(event.body));
  }
  const {email, password} = JSON.parse(JSON.stringify(event.body));
  console.log("EMAIL is", email);
  console.log("Password is", password);
  console.log("Client id is", clientId);
  console.log("Client name is", clientName);
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
  return {
    body: JSON.stringify({message: "Sign up function is called"}),
    statusCode: 200
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
