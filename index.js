#!/usr/bin/env node

var niru     = require('commander')
var jetpack  = require('fs-jetpack')
var userHome = require('user-home')
var yaml     = require('js-yaml')
var git      = require('simple-git')(jetpack.cwd())

var soupfilePath   = `${userHome}/soupfile.yml`
var soupfileExists = jetpack.exists(soupfilePath)



niru
  // .usage('init')
  .command('init', 'initialize niru with a soupfile')
  .action(function(){
    if (niru.args[0] === 'init') {
      console.log(`created soupfile at ${soupfilePath}`)
      process.exit()
    }
  })

niru
  // .usage('<noodle> [path]')
  .arguments('<noodle> [path]')
  .option('-g, --git', ' initialize the project as a Git repository')
  .action(function(chopstick, path){
    var soup         = yaml.safeLoad(jetpack.read(soupfilePath))
    var noodles      = soup.noodles
    var noodle       = noodles[chopstick]
    var repoName     = noodle.split('/')[4]
    if (!path) var path = repoName

    console.log(`creating ${chopstick} boilerplate at ${path}`)
    git.clone(noodle, (jetpack.cwd() + '/' + path) || jetpack.cwd() + '/' + repoName)
    process.exit()
  })

niru.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ niru -g my-boilerplate ./new-project');
  console.log('');
});

niru.usage(
  /*      niru*/'[options] <noodle> [path]\n' +
  '     Or: niru <command> [options]'
)

niru.parse(process.argv)
