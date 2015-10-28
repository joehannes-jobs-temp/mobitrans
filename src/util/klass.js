var classify = function () {
  var _args = Array.prototype.slice.call(arguments);
  var _super = typeof _args[0] === "function" && typeof c !== "undefined" && c !== null;
  var e = _super ? _args[0] : function () {};
  var c = _super ? _args[1] : _args[0];
  var args = _super ? (_args[2] || {}) : (_args[1] || {});

  var foo = function () {
    this.constructor.prototype.constructor.call(this, Array.prototype.slice.call(arguments));
  };

  var cache = {
      prototype: Object.create(e.prototype),
      constructor: c
  };
  foo.prototype = cache.prototype;
  foo.prototype.constructor = cache.constructor;
  Object.defineProperties(foo.prototype, args);

  foo.extends = function (_e) {
      cache.prototype = Object.defineProperties(cache.prototype, Object.keys(_e.prototype).reduce(function (descriptors, key) {
          descriptors[key] = Object.getOwnPropertyDescriptor(_e.prototype, key);
          return descriptors;
      }, {}));
      cache.constructor = (function (_c) {
          console.log("cached constructor");
          _e.call(this);
          _c.apply(this, Array.prototype.slice.call(arguments));
      })(cache.constructor);
      //foo.prototype.constructor = cache.constructor;
  }
  foo.defineProperties = Object.defineProperties.bind(Object, cache.prototype);

  return foo;
};

function S() {
    console.log("SuperFoo S");
}
S.prototype.base = function () { console.log("base"); };

/*
var C = klass(S, {
    constructor: function (a) {
        console.log("Child C");
        console.log("arg " + a.toString());
    }
}, {
    attitude: {
        enumerable: false,
        writable: false,
        value: function () { console.log("I'm trying to be diligent!"); }
    }
});
C.defineProperties({
    skill: {
        enumerable: true,
        writable: true,
        value: function () { console.log("I can code!"); }
    }
});
*/

var C = classify(function () {
    this.constructor();
    console.log("Child C constructor - yeah, sure");
});
C.extends(S);
C.defineProperties({
    skill: {
        enumerable: true,
        writable: true,
        value: function () { console.log("I can code!"); }
    },
    attitude: {
        enumerable: false,
        writable: false,
        value: function () { console.log("I'm trying to be diligent!"); }
    }
})

var instance = new C("instance");
console.log("----");
console.log(instance instanceof C);
console.log(instance instanceof S);
instance.base();
console.log("*********");
instance.attitude();
instance.skill();
