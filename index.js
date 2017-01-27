#!/usr/bin/env node

var niru     = require('commander')
var jetpack  = require('fs-jetpack')
var userHome = require('user-home')
var yaml     = require('js-yaml')
var git      = require('simple-git')(jetpack.cwd())

var soupfilePath   = `${userHome}/soupfile.yml`
var soupfileExists = jetpack.exists(soupfilePath)

var nodePath = process.argv[0]
var niruPath = process.argv[1]
var args     = process.argv.slice(2, process.argv.length)

console.log(args)
