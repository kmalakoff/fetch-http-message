const assert = require('assert');

let umd = null;
try {
  umd = require('fetch-http-message/umd');
} catch (_) {
  umd = require('fetch-http-message/dist/umd/fetch-http-message.cjs');
}
const fetchHttpMessage = typeof window !== 'undefined' ? window.fetchHttpMessage : umd.default || umd;

const url = 'https://test.com/';

describe('exports umd', () => {
  it('defaults', () => {
    const message = fetchHttpMessage(url);
    assert.equal(message, `GET ${url} HTTP/1.1`);
  });
});
