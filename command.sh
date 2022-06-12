# Build
npm run build

# Synth
cdk synth

# Bootstrap
cdk bootstrap

# Deploy
cdk deploy

# local Test lambda function.
cdk synth --no-staging > ./playground/template.yml && cd ./playground/ && sam local invoke <FUNCTION_NAME>


# local test API endpoint.
cdk synth --no-staging > ./playground/template.yml && cd ./playground/ &&  sam local start-api