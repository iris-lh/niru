#!/usr/bin/env node

var program  = require('commander')
var jetpack  = require('fs-jetpack')
var userHome = require('user-home')
var yaml     = require('js-yaml')
var git      = require('simple-git')(jetpack.cwd())



program

  .arguments('<type> <path>')

  .option('-g, --git', 'initialize the project as a Git repository')

  .action(function(type, path) {
    var soupfilePath = userHome+'/soupfile.yml'
    var soupfile     = yaml.safeLoad(jetpack.read(soupfilePath))
    var noodles      = soupfile.noodles
    var noodle       = noodles[type]

    git.clone(noodle, path)

  })

  .parse(process.argv)
