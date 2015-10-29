"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("es6-math");
var col = require("./util/colorlog");
var randomInt = require("random-int");
var math = require("mathjs");

var Expression = (function () {
    function Expression() {
        _classCallCheck(this, Expression);
    }

    _createClass(Expression, null, [{
        key: "operationCountInc",
        value: function operationCountInc() {
            this._operationCount = this._operationCount + 1;
        }
    }, {
        key: "setNode",
        value: function setNode() {
            this.tree.push(this.operation);
        }
    }, {
        key: "clear",
        value: function clear() {
            this.tree = null;
            this.operationCount = null;
        }
    }, {
        key: "validate",
        value: function validate(input) {
            var result = Math.round(this.expression.compile().eval());
            var truthy = input == result;
            this.clear();
            return truthy ? true : result;
        }
    }, {
        key: "minComplexity",
        get: function get() {
            return this._minComplexity || 2;
        },
        set: function set(m) {
            if (m > 1) this._minComplexity = m;else throw {
                msg: col.warn("Cannot set minComplexity to too small value: " + m),
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
                msg: col.warn("Cannot set expression/game-complexity to" + c + "\n" + "Current boundaries are: " + this.minComplexity + ".." + this.maxComplexity),
                level: "warn"
            };
        }
    }, {
        key: "variable",
        get: function get() {
            return ["a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z"].split(",")[this.operationCount];
        }
    }, {
        key: "integer",
        get: function get() {
            return randomInt(1, 100);
        }
    }, {
        key: "space",
        get: function get() {
            return " ";
        }
    }, {
        key: "operationCount",
        get: function get() {
            return this._operationCount || 0;
        },
        set: function set(zero) {
            this._operationCount = 0;
        }
    }, {
        key: "operator",
        get: function get() {
            return ["+", "-", "*", "/"][Math.floor(Math.random() * (this.operationCount ? 4 : 2))];
        }
    }, {
        key: "operation",
        get: function get() {
            var equation = this.operationCount ? this.operator + this.space + this.integer : this.integer;
            this.operationCountInc();
            return equation;
        }
    }, {
        key: "tree",
        get: function get() {
            return this._tree || [];
        },
        set: function set(zero) {
            this._tree = [];
        }
    }, {
        key: "expression",
        get: function get() {
            return math.parse(this.tree.join(this.space));
        },
        set: function set(level) {
            this.complexity = level;
            this.clear();
            for (var i = 0; i < this.complexity; i++) {
                this.setNode();
            }
        }
    }, {
        key: "equation",
        get: function get() {
            return this.expression.toString();
        }
    }]);

    return Expression;
})();

module.exports = Expression;
