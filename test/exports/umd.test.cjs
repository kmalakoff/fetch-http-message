const assert = require('assert');

let umd = null;
if (typeof window === 'undefined') {
  const [major, minor] = process.versions.node.split('.').map(Number);
  const supportsExports = major > 13 || (major === 13 && minor >= 2) || (major === 12 && minor >= 16);
  umd = supportsExports ? require('fetch-http-message/umd') : require('fetch-http-message/dist/umd/fetch-http-message.cjs');
}
const fetchHttpMessage = typeof window !== 'undefined' ? window.fetchHttpMessage : umd.default || umd;

const url = 'https://test.com/';

describe('exports umd', () => {
  it('defaults', () => {
    const message = fetchHttpMessage(url);
    assert.equal(message, `GET ${url} HTTP/1.1`);
  });
});
