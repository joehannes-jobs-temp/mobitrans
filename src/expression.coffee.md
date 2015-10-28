Imports

    require "es6-math"
    col = require "./util/colorlog"

This is the main Object for creating and handling game/math expressions

    class Expression

    _minComplexity = 2
    _maxComplexity = 5
    _complexity = 2
    minComplexity = (m) ->
        if m > 0 then _minComplexity = m
        else throw {
            msg: col.warn "Cannot set minComplexity to too small value: ", m
            level: "warn"
        }
    maxComplexity = (m) ->
        if m < 11 then _maxComplexity = m
        else throw {
            msg: col.warn "Cannot set maxComplexity higher than 10, please contact the author if you feel it shouldn't be so ..."
            level: "warn"
        }
    complexity = (c) ->
        if c > _minComplexity and c <= _maxComplexity
            _complexity = c
        else throw {
            msg: col.warn "Cannot set expression/game-complexity to", c, "\n", "Current boundaries are: ", _minComplexity, "..", _maxComplexity
            level: "warn"
        }

    Expression.complexity = (o) ->
        if o? then switch typeof o
            when "number"
                if Number.isInteger o then complexity o
                else complexity Math.trunc o
                return _complexity
            when "object"
                msgs = []
                if o.complexity?
                    try
                        if typeof o.complexity is "number"
                            complexity o.complexity
                        else throw {
                            msg: col.error "Cannot set complexity to non-integer of type #{typeof o.complexity}", "\n"
                            level: "error"
                        }
                    catch msg
                        msgs.push msg
                if o.min?
                    try
                        if typeof o.min is "number"
                            minComplexity = o.min
                        else throw {
                            msg: col.error "Cannot set minComplexity to non-integer of type #{typeof o.min}", "\n"
                            level: "error"
                        }
                    catch msg
                        msgs.push msg
                if o.max?
                    try
                        if typeof o.max is "number"
                            maxComplexity o.max
                        else throw {
                            msg: col.error "Cannot set maxComplexity to non-integer of type #{typeof o.max}", "\n"
                            level: "error"
                        }
                    catch msg
                        msgs.push msg
                if msgs.length then throw {
                    msg: msgs
                    level: if (msgs.filter (el, i, arr) -> el.level is "error").length then "error" else "warn"
                } else return _coplexity
            else throw {
                msg: col.warn "I do not understand input vars other than of type {number, object}"
                level: "warn"
            }
        else _complexity
