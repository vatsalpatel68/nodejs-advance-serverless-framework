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
  console.log("event is", event);
  console.log("environment variables are", process.env);
  return {
    body: JSON.stringify({message: "Sign up function is called"}),
    statusCode: 200
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
