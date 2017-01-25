#!/usr/bin/env node

var program = require('commander');
var jetpack = require('fs-jetpack')

program
.arguments('<type> <name>')
.option('-g, --git', 'initialize the project as a Git repository')
.action(function(type, name) {
  console.log(type, name)
})
.parse(process.argv);
