"use strict";

var vorpal = require('vorpal')();
var color = require('./util/colorlog');
var logic = require('./expression');

vorpal
    .command('play [lvl]', 'Sets complexity level of the game and kicks it off :)')
    .action(function (args, callback) {
        let that = this;
        try {
            logic.expression = args.lvl;
            this.prompt({
                type: 'input',
                name: 'result',
                message: color.style.bgBlack(logic.equation + ": ")
            }, function (input) {
                let answer = logic.validate(input.result);
                if (answer === true) {
                    that.log(color.style.underline.bgBlack("Superb!!! I'm delighted :)\n"));
                } else {
                    that.log(color.error("Ooops, right answer: " + answer));
                }
                callback();
            });
        }
        catch (err) {
            this.log(color[err.level](err.msg));
        }
    });

module.exports = vorpal;
