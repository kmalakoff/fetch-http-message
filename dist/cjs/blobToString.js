// https://stackoverflow.com/a/23024613/3150390
/* c8 ignore start */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default" /* c8 ignore stop */ , {
    enumerable: true,
    get: function() {
        return blobToString;
    }
});
function blobToString(b) {
    var u = URL.createObjectURL(b);
    var x = new XMLHttpRequest();
    x.open('GET', u, false);
    x.send();
    URL.revokeObjectURL(u);
    return x.responseText;
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }