#!/usr/bin/env node

var niru     = require('commander')
var jetpack  = require('fs-jetpack')
var userHome = require('user-home')
var yaml     = require('js-yaml')
var git      = require('simple-git')(jetpack.cwd())

var soupfilePath   = `${userHome}/soupfile.yml`
var soupfileExists = jetpack.exists(soupfilePath)



niru
  .command('init', 'initialize niru with a soupfile')
  .action(function(){
    if (niru.args[0] === 'init') {
      console.log(`created soupfile at ${soupfilePath}`)
      process.exit()
    }
  })

niru
  .command('get', 'get a boilerplate from the collection')
  .arguments('<boilerplate>')
  .action(function(boilerplate){
    if (niru.args[0] === 'get') {
      var soup         = yaml.safeLoad(jetpack.read(soupfilePath))
      var noodles      = soup.noodles
      var noodle       = noodles[boilerplate]
      console.log(
        'BOILERPLATE:',boilerplate,'\n',
        'SOUP:',soup,'\n',
        'NOODLES:',noodles,'\n',
        'NOODLE:',noodle,'\n'
      )
      if (!path) var path = repoName

      console.log(`creating ${boilerplate} boilerplate at ${path}`)
      git.clone(noodle, jetpack.cwd())
      process.exit()
    }
  })

niru.parse(process.argv)
