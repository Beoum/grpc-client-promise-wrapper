# grpc-client-promise-wrapper

## Documentation
Use async/await for @grpc/grpc-js package

## Installation
```sh
$ npm install grpc-client-promise-wrapper
```
## Javascript
```js
const promiseWrapper = require('grpc-client-promise-wrapper');
```
## Typescript
```ts
import * as promiseWrapper from 'grpc-client-promise-wrapper';
```

## Example
* test.proto
```protobuf
syntax = "proto3";

package test;

service TestService {
  rpc GetTestFn (inputParam) returns (returnValue);
}

message InputParam {
  string inputParam = 1;
}

message ReturnValue {
  string returnValue = 1;
}
```
* app.js
```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const promiseWrapper = require('grpc-client-promise-wrapper');

const testStub = () => {
  const packageDefinition = protoLoader.loadSync(path.join(__dirname, './test.proto'));
  const testService = grpc.loadPackageDefinition(packageDefinition).test;
  return promiseWrapper(new testService.TestService('localhost:3001', grpc.credentials.createInsecure()));
};

const getTestFn = async (params) => {
  return testStub().getTestFn(params);
};
```


## License

[MIT License](https://andreasonny.mit-license.org/2019)
