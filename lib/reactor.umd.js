(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.reactor = {}));
}(this, (function (exports) {
  // export * from "./components";
  function hello() {
    var _console;

    ((_console = console) === null || _console === void 0 ? void 0 : _console.log) && console.log("hello world");
  }

  exports.hello = hello;

})));
//# sourceMappingURL=reactor.umd.js.map
