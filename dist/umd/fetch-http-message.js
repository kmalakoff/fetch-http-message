(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fetchHttpMessage = factory());
})(this, (function () { 'use strict';

  // https://stackoverflow.com/a/23024613/3150390
  /* c8 ignore start */ function blobToString(b) {
      var u = URL.createObjectURL(b);
      var x = new XMLHttpRequest();
      x.open("GET", u, false);
      x.send();
      URL.revokeObjectURL(u);
      return x.responseText;
  } /* c8 ignore stop */

  // @ts-ignore
  function _instanceof(left, right) {
      if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
          return !!right[Symbol.hasInstance](left);
      } else {
          return left instanceof right;
      }
  }
  var hasHeaders = typeof Headers !== "undefined";
  var hasBlob = typeof Blob !== "undefined";
  var hasBuffer = typeof Buffer !== "undefined";
  var hasURLSearchParams = typeof URLSearchParams !== "undefined";
  function isRequest(object) {
      return typeof object === "object";
  }
  /**
   * Generate an http message string using the fetch API
   *
   * @param input Fetch input
   * @param init Fetch init
   * @returns The http message string
   */ function fetchHttpMessage(input, init) {
      if (input === undefined) throw new Error("Input is expected");
      if (init === undefined) init = {};
      var url;
      if (isRequest(input)) url = input.url;
      else {
          url = input;
          input = {};
      }
      var method = init.method || input.method || "GET";
      method = method.toUpperCase();
      var lines = [
          "".concat(method, " ").concat(url, " HTTP/1.1")
      ];
      var headers = init.headers || input.headers;
      if (headers !== undefined) {
          /* c8 ignore start */ if (hasHeaders && _instanceof(headers, Headers)) {
              var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
              try {
                  for(var _iterator = headers.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                      var pair = _step.value;
                      lines.push("".concat(pair[0], ": ").concat(pair[1]));
                  }
              } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
              } finally{
                  try {
                      if (!_iteratorNormalCompletion && _iterator.return != null) {
                          _iterator.return();
                      }
                  } finally{
                      if (_didIteratorError) {
                          throw _iteratorError;
                      }
                  }
              }
          } else {
              /* c8 ignore stop */ for(var key in headers)lines.push("".concat(key, ": ").concat(headers[key]));
          }
      }
      var body = init.body;
      if (body !== undefined) {
          if (~[
              "GET",
              "HEAD"
          ].indexOf(method)) throw new Error("Option body not valid with method ".concat(method));
          /* c8 ignore start */ if (hasBlob && _instanceof(body, Blob)) {
              lines.push("");
              lines.push(blobToString(body));
          } else if (/* c8 ignore stop */ typeof body === "string" || _instanceof(body, String) || /* c8 ignore start */ hasBuffer && _instanceof(body, Buffer) || hasURLSearchParams && _instanceof(body, URLSearchParams)) {
              lines.push("");
              lines.push(body.toString());
          } else throw new Error("Option body should be convertible to a string");
      }
      return lines.join("\r\n");
  }

  return fetchHttpMessage;

}));
//# sourceMappingURL=fetch-http-message.js.map
