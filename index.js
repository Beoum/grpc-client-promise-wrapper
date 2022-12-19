"use strict";

const promiseWrapper = (client) => {
  const wrapFunctions = {};

  Object.keys(Object.getPrototypeOf(client))
    .forEach(functionName => {
      wrapFunctions[functionName] = async (...args) => {
        const result = await new Promise(resolve => {
          client[functionName](...args, (err, val) => {
            resolve(err || val);
          });
        });

        if (result instanceof Error) {
          const error = new Error();
          error.message = result.details ? result.details : 'Occur error when gRPC call';
          error.details = result.details;
          error.code = result.code;
          error.metadata = result.metadata;

          throw error;
        }

        return result;
      }
    });

  return wrapFunctions;
};

module.exports = promiseWrapper;
