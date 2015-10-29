"use strict";

var vorpal = require('vorpal')();
var chalk = require('chalk');



vorpal
    .command('-level [lvl]', 'Sets complexity level of the game')
    .action(function (args, callback) {
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
