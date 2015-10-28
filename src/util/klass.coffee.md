A small base class util that makes use of ES6-Proxys for magic functions

Imports

    require "harmony-reflect"

The classy Klass

First we define our constructor and prototype Objects/Functions

    konstructor = (extendee, foo, args...) ->
        extendee.call @
        foo.apply @, args

    klass = (o) ->
        k = new Proxy o, {
            get: ( target, name ) ->
                console.log 'get' name
                return target[ name ]

            set: ( target, name, value ) ->
                console.log 'set' name
                target[ '%is-clean' ] = no if value isnt target[ name ]
                if value is undefined then delete target[ name ]
                else                       target[ name ] = value
                return value
        }
        Object.assign.bind Object, k
