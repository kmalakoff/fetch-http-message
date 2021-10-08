// https://stackoverflow.com/a/23024613/3150390

/* c8 ignore start */
function blobToString(b) {
  const u = URL.createObjectURL(b);
  const x = new XMLHttpRequest();
  x.open("GET", u, false);
  x.send();
  URL.revokeObjectURL(u);
  return x.responseText;
}
/* c8 ignore stop */

const hasHeaders = typeof Headers !== "undefined";
const hasBlob = typeof Blob !== "undefined";
const hasBuffer = typeof Buffer !== "undefined";
const hasURLSearchParams = typeof URLSearchParams !== "undefined"; // export type RequestRedirect = 'error' | 'follow' | 'manual';

function isRequest(object) {
  return typeof object === "object";
}
/**
 * Generate an http message string using the fetch API
 *
 * @param input Fetch input
 * @param init Fetch init
 * @returns The http message string
 */


function fetchHttpMessage(input, init) {
  if (input === undefined) throw new Error("Input is expected");
  if (init === undefined) init = {};
  let url;
  if (isRequest(input)) url = new URL(input.url);else {
    url = new URL(input);
    input = {};
  }
  let method = init.method || input.method || "GET";
  method = method.toUpperCase();
  const lines = [`${method} ${url.toString()} HTTP/1.1`];
  const headers = init.headers || input.headers;

  if (headers !== undefined) {
    /* c8 ignore start */
    if (hasHeaders && headers instanceof Headers) {
      for (const pair of headers.entries()) lines.push(`${pair[0]}: ${pair[1]}`);
    } else {
      /* c8 ignore stop */
      for (const key in headers) lines.push(`${key}: ${headers[key]}`);
    }
  }

  const body = init.body;

  if (body !== undefined) {
    if (~["GET", "HEAD"].indexOf(method)) throw new Error(`Option body not valid with method ${method}`);
    /* c8 ignore start */

    if (hasBlob && body instanceof Blob) {
      lines.push("");
      lines.push(blobToString(body));
    } else if (
    /* c8 ignore stop */
    typeof body === "string" || body instanceof String ||
    /* c8 ignore start */
    hasBuffer && body instanceof Buffer || hasURLSearchParams && body instanceof URLSearchParams
    /* c8 ignore stop */
    ) {
      lines.push("");
      lines.push(body.toString());
    } else throw new Error("Option body should be convertible to a string");
  }

  return lines.join("\r\n");
}

export { fetchHttpMessage as default };
//# sourceMappingURL=index.js.map
