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
  it('서비스 갯수만큼 wrapping 되어야 한다.', () => {
    const result = promiseWrapper(TEST_GRPC_DATA);
    expect(Object.keys(result).length).toBe(Object.keys(TEST_GRPC_PROTO).length)
  })

  it('콜백함수를 promise함수로 변환해야 한다.', async () => {
    const result = await promiseWrapper(TEST_GRPC_DATA).testService(TEST_DATA)
    expect(result).toBe(TEST_DATA.data)
  })
})
