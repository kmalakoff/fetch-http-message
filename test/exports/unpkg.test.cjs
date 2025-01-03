const assert = require('assert');
const fetchMessage = require('fetch-http-message/dist/umd/fetch-http-message.cjs');

const url = 'https://test.com/';

describe('exports fetch-http-message/dist/umd/fetch-http-message.cjs', () => {
  it('defaults', () => {
    const message = fetchMessage(url);
    assert.equal(message, `GET ${url} HTTP/1.1`);
  });
});
