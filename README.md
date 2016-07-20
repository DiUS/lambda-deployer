# lambda-deployer
AWS Lambda function which deploys lambda functions

### Usage
- Create S3 bucket which contains ZIPs of lambdas source codes  
- Put `lambda-deployer` source code to the same S3 bucket  
- Create `lambda-deployer` from S3 and give the following permissions:
  - Basic labda function execution permissions
  - S3 Read only permissions
  - "lambda:UpdateFunctionCode" permission
- Set `lambda-deployer` as listener on S3 put object event

**Note:** deployer is searching for the lambda functions by the file name: `<function-name>.zip`. If such function does not exist deployer will return error

### TODO
- Deployer should create lambda function if it does not exist
- Handle `*.json` permission setting for lambda functions
- Publish notifications to AWS SNS
