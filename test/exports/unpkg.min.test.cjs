const assert = require('assert');
const fetchMessage = require('fetch-http-message/dist/umd/fetch-http-message.min.js');

const url = 'https://test.com/';

describe('exports fetch-http-message/dist/umd/fetch-http-message.min.js', () => {
  it('defaults', () => {
    const message = fetchMessage(url);
    assert.equal(message, `GET ${url} HTTP/1.1`);
  });
});
