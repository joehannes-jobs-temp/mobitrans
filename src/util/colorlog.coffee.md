Imports

    chalk = require  "chalk"

    class col
    col._style = "green"
    col.style = (c) ->
        if c? then col._style = c
        chalk[col._style]
    col.log = (args...) ->
        out = for arg in args
            if arg is "\n" then arg
            else if typeof arg is "string"
                col.style.bold arg
            else
                col.style.underline.bgBlack(arg)
        out.join " "
    col.info = (args...) ->
        col.style "green"
        col.log args...
    col.warn = (args...) ->
        col.style "magenta"
        col.log args
    col.error = (args...) ->
        col.style. "red"
        col.log args

    module.exports = col
