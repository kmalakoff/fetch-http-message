import assert from 'assert';
// @ts-ignore
import fetchMessage, { type HeadersObject } from 'fetch-http-message';
import '../polyfills.cjs';

const url = 'https://test.com/';

describe('fetch-http-message', () => {
  it('error: no url', () => {
    assert.throws(() => fetchMessage(undefined));
  });

  it('defaults', () => {
    const message = fetchMessage(url);
    assert.equal(message, `GET ${url} HTTP/1.1`);
  });

  it('default method', () => {
    const message = fetchMessage(url, {});
    assert.equal(message, `GET ${url} HTTP/1.1`);
  });

  describe('method', () => {
    it('POST', () => {
      const message = fetchMessage(url, { method: 'POST' });
      assert.equal(message, `POST ${url} HTTP/1.1`);
    });

    it('POST body', () => {
      const message = fetchMessage(url, { method: 'POST', body: 'post-body' });
      assert.equal(message, [`POST ${url} HTTP/1.1`, '', 'post-body'].join('\r\n'));
    });
  });

  describe('HeadersObject', () => {
    it('multiple headers', () => {
      const headers = { header1: 'value 1', header2: 'value 2' };
      const message = fetchMessage(url, { method: 'POST', headers });
      assert.equal(message, [`POST ${url} HTTP/1.1`, 'header1: value 1', 'header2: value 2'].join('\r\n'));
    });

    it('multiple headers and body', () => {
      const headers = { header1: 'value 1', header2: 'value 2' };
      const message = fetchMessage(url, { method: 'PATCH', headers, body: 'post-body' });
      assert.equal(message, [`PATCH ${url} HTTP/1.1`, 'header1: value 1', 'header2: value 2', '', 'post-body'].join('\r\n'));
    });
  });

  typeof Headers === 'undefined' ||
    describe('Headers', () => {
      it('multiple headers', () => {
        const headers = new Headers();
        headers.set('header1', 'value 1');
        headers.set('header2', 'value 2');
        const message = fetchMessage(url, { method: 'POST', headers });
        assert.equal(message, [`POST ${url} HTTP/1.1`, 'header1: value 1', 'header2: value 2'].join('\r\n'));
      });

      it('multiple headers and body', () => {
        const headers = new Headers();
        headers.set('header1', 'value 1');
        headers.set('header2', 'value 2');
        const message = fetchMessage(url, { method: 'PATCH', headers, body: 'post-body' });
        assert.equal(message, [`PATCH ${url} HTTP/1.1`, 'header1: value 1', 'header2: value 2', '', 'post-body'].join('\r\n'));
      });
    });

  describe('body', () => {
    it('error: GET with body', () => {
      assert.throws(() => fetchMessage(url, { method: 'GET', body: 'get-body' }));
    });

    it('error: HEAD with body', () => {
      assert.throws(() => fetchMessage(url, { method: 'HEAD', body: 'get-body' }));
    });

    it('error: non-string body', () => {
      const body = function body() {
        return null;
      } as unknown;
      assert.throws(() => fetchMessage(url, { method: 'POST', body: body as string }));
    });

    it('string body', () => {
      const message = fetchMessage(url, { method: 'POST', body: 'post-body' });
      assert.equal(message, [`POST ${url} HTTP/1.1`, '', 'post-body'].join('\r\n'));
    });

    typeof Blob === 'undefined' ||
      typeof XMLHttpRequest === 'undefined' ||
      it('Blob body', () => {
        const message = fetchMessage(url, {
          method: 'POST',
          body: new Blob([JSON.stringify({ test: true })], { type: 'application/json' }),
        });
        assert.equal(message, [`POST ${url} HTTP/1.1`, '', '{"test":true}'].join('\r\n'));
      });

    typeof Buffer === 'undefined' ||
      it('Buffer body', () => {
        const message = fetchMessage(url, {
          method: 'POST',
          body: Buffer.from('aaaaa'),
        });
        assert.equal(message, [`POST ${url} HTTP/1.1`, '', 'aaaaa'].join('\r\n'));
      });

    typeof URLSearchParams === 'undefined' ||
      it('URLSearchParams body', () => {
        const string = 'q=URLUtils.searchParams&topic=api';
        const message = fetchMessage(url, {
          method: 'POST',
          body: new URLSearchParams(string),
        });
        assert.equal(message, [`POST ${url} HTTP/1.1`, '', string].join('\r\n'));
      });
  });

  describe('init', () => {
    it('GET not override', () => {
      const message = fetchMessage({ url, method: 'GET', headers: {} as HeadersObject }, {});
      assert.equal(message, `GET ${url} HTTP/1.1`);
    });

    it('POST override', () => {
      const message = fetchMessage({ url, method: 'GET', headers: {} as HeadersObject }, { method: 'POST' });
      assert.equal(message, `POST ${url} HTTP/1.1`);
    });

    it('headers not override', () => {
      const headers1 = { x: 'value 1', y: 'value 2' } as HeadersObject;
      const message = fetchMessage({ url, method: 'GET', headers: headers1 }, { method: 'PATCH', body: 'post-body' });
      assert.equal(message, [`PATCH ${url} HTTP/1.1`, 'x: value 1', 'y: value 2', '', 'post-body'].join('\r\n'));
    });

    it('headers override', () => {
      const headers1 = { x: 'value 1', y: 'value 2' } as HeadersObject;
      const headers2 = { header1: 'value 1', header2: 'value 2' } as HeadersObject;
      const message = fetchMessage({ url, method: 'GET', headers: headers1 }, { method: 'PATCH', headers: headers2, body: 'post-body' });
      assert.equal(message, [`PATCH ${url} HTTP/1.1`, 'header1: value 1', 'header2: value 2', '', 'post-body'].join('\r\n'));
    });
  });
});
