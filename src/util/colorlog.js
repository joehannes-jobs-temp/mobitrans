"use strict";

var chalk = require ("chalk");

class Color
    static get style () {
        return chalk[this._style || "green"];
    }
    static set style (c) {
        this._style = c;
    }
    static ify (...args) {
        let str = "";
        for (let _str of args) {
            if (arg === "\n") {
                str += _str;
            } else {
                if (typeof _str === "string") {
                    str += this.style().bold(_str);
                } else {
                    str += this.style().underline.bgBlack(_str);
                }
            }
        }
        return str;
    }
    static infoify (...args) {
        this.style("green");
        return this.ify(args);
    }
    static warnify (...args) {
        this.style("magenta");
        return this.ify(args);
    }
    static errorify (...args) {
        this.style("red");
        return this.ify(args);
    }
}

module.exports = Color
