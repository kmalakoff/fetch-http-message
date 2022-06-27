"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
module.exports = blobToString;
function blobToString(b) {
    var u = URL.createObjectURL(b);
    var x = new XMLHttpRequest();
    x.open("GET", u, false);
    x.send();
    URL.revokeObjectURL(u);
    return x.responseText;
} /* c8 ignore stop */ 
