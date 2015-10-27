Imports

    chalk = require  "chalk"

    class C
    C._style = "green"
    C.style = (c) ->
        if c? then C._style = c
        chalk[C._style]
    C.log = (args...) ->
        out = for arg in args
            if arg is "\n" then arg
            else if typeof arg is "string"
                C.style.bold arg
            else
                C.style.underline.bgBlack(arg)
        out.join " "
    C.info = (args...) ->
        C.style "green"
        C.log args...
    C.warn = (args...) ->
        C.style "magenta"
        C.log args
    c.error = (args...) ->
        C.style. "red"
        C.log args

    module.exports = C
