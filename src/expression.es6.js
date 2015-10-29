"use strict";

require("es6-math");
var col = require("./util/colorlog");
var randomInt = require("random-int");
var math = require("mathjs");

class Expression {
    static get minComplexity () {
        return this._minComplexity || 2;
    }
    static set minComplexity (m) {
        if (m > 1) this._minComplexity = m;
        else throw {
            msg: col.warn("Cannot set minComplexity to too small value: " + m),
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
            msg: col.warn("Cannot set expression/game-complexity to" + c + "\n" + "Current boundaries are: " + this.minComplexity + ".." + this.maxComplexity),
            level: "warn"
        }
    }
    static get variable () {
        return ["a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z"].split(",")[this.operationCount];
    }
    static get integer () {
        return randomInt(1, 100);
    }
    static get space () {
        return " ";
    }
    static get operationCount () {
        return this._operationCount || 0;
    }
    static set operationCount (zero) {
        this._operationCount = 0;
    }
    static operationCountInc () {
        this._operationCount = this._operationCount + 1;
    }
    static get operator () {
        return ["+", "-", "*", "/"][Math.floor(Math.random() * (this.operationCount ? 4 : 2))];
    }
    static get operation () {
        let equation = this.operationCount ?
            this.operator + this.space + this.integer :
            this.integer;
        this.operationCountInc();
        return equation;
    }
    static setNode () {
        this.tree.push(this.operation);
    }
    static get tree () {
        return this._tree || [];
    }
    static set tree (zero) {
        this._tree = [];
    }
    static clear () {
        this.tree = null;
        this.operationCount = null;
    }
    static get expression () {
        return math.parse(this.tree.join(this.space));
    }
    static get equation () {
        return this.expression.toString();
    }
    static set expression (level) {
        this.complexity = level;
        this.clear();
        for (let i = 0; i < this.complexity; i++) {
            this.setNode();
        }
    }
    static validate (input) {
        let result = Math.round(this.expression.compile().eval());
        let truthy = (input == result);
        this.clear();
        return (truthy) ?
            true :
            result;
    }
}

module.exports = Expression;
