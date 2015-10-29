"use strict";

require("es6-math");
col = require("./util/colorlog");

class Expression {
    static get minComplexity () {
        return this._minComplexity || 2;
    }
    static set minComplexity (m) {
        if (m > 1) this._minComplexity = m;
        else throw {
            msg: col.warn("Cannot set minComplexity to too small value: ", m),
            level: "warn"
        }
    }
    static get maxComplexity () {
        return this._maxComplexity || 5;
    }
    static set maxComplexity (m) {
        if (m < 11 && m > 1) this._maxComplexity = m;
        else throw {
            msg: col.warn("Cannot set maxComplexity higher than 10, please contact the author if you feel it shouldn't be so ..."),
            level: "warn"
        }
    }
    static get complexity () {
        return this._complexity || 2;
    }
    static set complexity (c) {
        if (c >= this.minComplexity && c <= this.maxComplexity) this._complexity = c;
        else throw {
            msg: col.warn("Cannot set expression/game-complexity to", c, "\n", "Current boundaries are: ", this.minComplexity, "..", this.maxComplexity),
            level: "warn"
        }
    }
}
