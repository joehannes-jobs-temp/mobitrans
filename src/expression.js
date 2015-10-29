"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("es6-math");
col = require("./util/colorlog");

var Expression = (function () {
    function Expression() {
        _classCallCheck(this, Expression);
    }

    _createClass(Expression, null, [{
        key: "minComplexity",
        get: function get() {
            return this._minComplexity || 2;
        },
        set: function set(m) {
            if (m > 1) this._minComplexity = m;else throw {
                msg: col.warn("Cannot set minComplexity to too small value: ", m),
                level: "warn"
            };
        }
    }, {
        key: "maxComplexity",
        get: function get() {
            return this._maxComplexity || 5;
        },
        set: function set(m) {
            if (m < 11 && m > 1) this._maxComplexity = m;else throw {
                msg: col.warn("Cannot set maxComplexity higher than 10, please contact the author if you feel it shouldn't be so ..."),
                level: "warn"
            };
        }
    }, {
        key: "complexity",
        get: function get() {
            return this._complexity || 2;
        },
        set: function set(c) {
            if (c >= this.minComplexity && c <= this.maxComplexity) this._complexity = c;else throw {
                msg: col.warn("Cannot set expression/game-complexity to", c, "\n", "Current boundaries are: ", this.minComplexity, "..", this.maxComplexity),
                level: "warn"
            };
        }
    }]);

    return Expression;
})();
