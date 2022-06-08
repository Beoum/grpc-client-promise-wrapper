declare type gRPCMethods = any;

/**
 * The rpc method defined in the loaded .proto file is returned when creating the client using @grpc/grpc-js.
 */
export default function promiseWrapper<T>(client: T): gRPCMethods;
