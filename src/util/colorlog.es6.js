"use strict";

var chalk = require ("chalk");

class Color {
    static get style () {
        "use strict";
        return chalk[this._style || "green"];
    }
    static set style (c) {
        this._style = c;
    }
    static ify (...args) {
        let str = "";
        for (let _str of args) {
            if (_str === "\n") {
                str += _str;
            } else {
                if (typeof _str === "string") {
                    str += this.style.bold(_str);
                } else {
                    str += this.style.underline.bgBlack(_str);
                }
            }
        }
        return str;
    }
    static info (...args) {
        this.style("green");
        return this.ify(args);
    }
    static warn (...args) {
        this.style("magenta");
        return this.ify(args);
    }
    static error (...args) {
        this.style("red");
        return this.ify(args);
    }
}

module.exports = Color
