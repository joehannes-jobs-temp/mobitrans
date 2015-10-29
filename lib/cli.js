"use strict";

var vorpal = require('vorpal')();
var color = require('./util/colorlog');
var logic = require('./expression');

vorpal.command('-level [lvl]', 'Sets complexity level of the game').action(function (args, callback) {
  try {
    logic.complexity = args.lvl;
  } catch (err) {
    this.log(color[err.lvl](err.msg));
    callback();
    return;
  }
  this.log(color.info("Game level successfully set to ", args.lvl));
  callback();
});

module.exports = vorpal;
/*
this.prompt({
  type: 'confirm',
  name: 'continue',
  default: false,
  message: 'That sounds like a really bad idea. Continue?',
}, function(result){
  if (!result.continue) {
    self.log('Good move.');
    cb();
  } else {
    self.log('Time to dust off that resume.');
    app.destroyDatabase(cb);
  }
});
*/