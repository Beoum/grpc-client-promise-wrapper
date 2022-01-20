const { it } = require('@jest/globals')
const { promiseWrapper } = require('./index')


function fn (query, callback) {
  callback(query)   
}

function testCallbackFn (query, callback) {
  fn(query, ({ error, data }) => {
    callback(error && data, error || data)
  })
}

const TEST_GRPC_PROTO = {
  testService: testCallbackFn,
  testServiceV2: testCallbackFn
}

const TEST_DATA = {
  error: null,
  data: 'grpcTest'
}

const TEST_GRPC_DATA = Object.create(TEST_GRPC_PROTO);

describe('test promiseWrapper()', () => {
  it('It should be "wrapped" by the number of services.', () => {
    const result = promiseWrapper(TEST_GRPC_DATA);
    expect(Object.keys(result).length).toBe(Object.keys(TEST_GRPC_PROTO).length)
  })

  it('Must convert the callback function to a promise function.', async () => {
    const result = await promiseWrapper(TEST_GRPC_DATA).testService(TEST_DATA)
    expect(result).toBe(TEST_DATA.data)
  })
})
