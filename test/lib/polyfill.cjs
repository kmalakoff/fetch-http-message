function polyfill() {
  if (typeof Buffer !== 'undefined' && !Buffer.from) {
    Buffer.from = function from(data) {
      return new Buffer(data);
    };
  }
}
polyfill();
