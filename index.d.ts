// GrpcObject type을 import하도록 하자!

declare type gRPCMethods = any;

/**
 * @grpc/grpc-js을 이용해서 client를 생성할 때 load했던 .proto file에 정의된 rpc method가 반환된다는 걸 알려주자!
 */
declare function promiseWrapper<T>(client: T): gRPCMethods; // generic T 를 GrpcObject 로 바꿀 것.

export = promiseWrapper;
