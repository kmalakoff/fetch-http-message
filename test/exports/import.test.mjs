import assert from 'assert';
import fetchMessage from 'fetch-http-message';

const url = 'https://test.com/';

describe('exports .mjs', () => {
  it('defaults', () => {
    const message = fetchMessage(url);
    assert.equal(message, `GET ${url} HTTP/1.1`);
  });
});
