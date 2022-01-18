"use strict";

const util = require('util');

const _promiseWrapper = (client) => {
  const wrapFunctions = {};

  Object.keys(Object.getPrototypeOf(client))
    .forEach(functionName => {
      wrapFunctions[functionName] = util.promisify(client[functionName].bind(client));
    });

  return wrapFunctions;
};

exports.promiseWrapper = _promiseWrapper;
