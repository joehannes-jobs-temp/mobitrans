math = require "mathjs"

c = (args...) ->
    console.log "-------------------------"
    console.log args...

node = math.parse ["x + 3", "x - 2"]
c node.toString()

code = node[1].compile()
c code.eval.toString()

result = code.eval { x: 3 }
c result

foo = {
    __noSuchMethod__ : (id, args) ->
        c id
        c args
}

foo.bar 1, 2, 3
