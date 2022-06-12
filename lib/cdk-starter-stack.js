"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkStarterStack = void 0;
const lambda = __importStar(require("@aws-cdk/aws-lambda"));
const aws_lambda_nodejs_1 = require("@aws-cdk/aws-lambda-nodejs");
const cdk = __importStar(require("@aws-cdk/core"));
const path = __importStar(require("path"));
class CdkStarterStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const myFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'my-function', {
            memorySize: 1024,
            timeout: cdk.Duration.seconds(5),
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'main',
            entry: path.join(__dirname, `/../src/funcs/my-lambda/index.ts`),
            bundling: {
                minify: true,
                externalModules: ['aws-sdk'],
            },
        });
    }
}
exports.CdkStarterStack = CdkStarterStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXN0YXJ0ZXItc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjZGstc3RhcnRlci1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQThDO0FBQzlDLGtFQUEwRDtBQUMxRCxtREFBcUM7QUFDckMsMkNBQTZCO0FBRTdCLE1BQWEsZUFBZ0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM1QyxZQUFZLEtBQWMsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxrQ0FBYyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDekQsVUFBVSxFQUFFLElBQUk7WUFDaEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxNQUFNO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtDQUFrQyxDQUFDO1lBQy9ELFFBQVEsRUFBRTtnQkFDUixNQUFNLEVBQUUsSUFBSTtnQkFDWixlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDN0I7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFoQkQsMENBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHtOb2RlanNGdW5jdGlvbn0gZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYS1ub2RlanMnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGNsYXNzIENka1N0YXJ0ZXJTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBteUZ1bmN0aW9uID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsICdteS1mdW5jdGlvbicsIHtcbiAgICAgIG1lbW9yeVNpemU6IDEwMjQsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcyg1KSxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgaGFuZGxlcjogJ21haW4nLFxuICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsIGAvLi4vc3JjL2Z1bmNzL215LWxhbWJkYS9pbmRleC50c2ApLFxuICAgICAgYnVuZGxpbmc6IHtcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxuICAgICAgICBleHRlcm5hbE1vZHVsZXM6IFsnYXdzLXNkayddLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19