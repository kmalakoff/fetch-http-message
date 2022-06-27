(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fetchHttpMessage = factory());
})(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    // https://stackoverflow.com/a/23024613/3150390
    /* c8 ignore start */
    function blobToString(b) {
        var u = URL.createObjectURL(b);
        var x = new XMLHttpRequest();
        x.open('GET', u, false);
        x.send();
        URL.revokeObjectURL(u);
        return x.responseText;
    }
    /* c8 ignore stop */

    var hasHeaders = typeof Headers !== 'undefined';
    var hasBlob = typeof Blob !== 'undefined';
    var hasBuffer = typeof Buffer !== 'undefined';
    var hasURLSearchParams = typeof URLSearchParams !== 'undefined';
    function isRequest(object) {
        return typeof object === 'object';
    }
    /**
     * Generate an http message string using the fetch API
     *
     * @param input Fetch input
     * @param init Fetch init
     * @returns The http message string
     */
    function fetchHttpMessage(input, init) {
        var e_1, _a;
        if (input === undefined)
            throw new Error('Input is expected');
        if (init === undefined)
            init = {};
        var url;
        if (isRequest(input))
            url = input.url;
        else {
            url = input;
            input = {};
        }
        var method = init.method || input.method || 'GET';
        method = method.toUpperCase();
        var lines = ["".concat(method, " ").concat(url, " HTTP/1.1")];
        var headers = init.headers || input.headers;
        if (headers !== undefined) {
            /* c8 ignore start */
            if (hasHeaders && headers instanceof Headers) {
                try {
                    for (var _b = __values(headers.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var pair = _c.value;
                        lines.push("".concat(pair[0], ": ").concat(pair[1]));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                /* c8 ignore stop */
                for (var key in headers)
                    lines.push("".concat(key, ": ").concat(headers[key]));
            }
        }
        var body = init.body;
        if (body !== undefined) {
            if (~['GET', 'HEAD'].indexOf(method))
                throw new Error("Option body not valid with method ".concat(method));
            /* c8 ignore start */
            if (hasBlob && body instanceof Blob) {
                lines.push('');
                lines.push(blobToString(body));
            }
            else if (
            /* c8 ignore stop */
            typeof body === 'string' ||
                body instanceof String ||
                /* c8 ignore start */
                (hasBuffer && body instanceof Buffer) ||
                (hasURLSearchParams && body instanceof URLSearchParams)
            /* c8 ignore stop */
            ) {
                lines.push('');
                lines.push(body.toString());
            }
            else
                throw new Error('Option body should be convertible to a string');
        }
        return lines.join('\r\n');
    }

    return fetchHttpMessage;

}));
//# sourceMappingURL=fetch-http-message.js.map
