/*
 * Configuration Setup
 * Author: Discens
*/

const fs = require('fs');

const logger = require('./logger');
const util = require('./util');

const settings = require('../../json/settings.json');

const init = async () => {

  let config = {};
  let profiles = {};

  logger.info("Please input credentials\n");

  config.email = util.prompt('Email: ');
  let exists = false;

  if (settings.askSave && fs.existsSync('../json/profiles.json')) {
    profiles = JSON.parse(fs.readFileSync('../json/profiles.json'));
    if(profiles[config.email] != undefined) {
      config = profiles[config.email];
      exists = true;
    }
  }

  if(!exists){
    config.password = util.prompt('Password: ', {noEchoBack: true});

    const mode = await util.select("Do you want to Snipe or Block?", ["Snipe", "Block"]);
    if(mode == "Snipe") config.snipe = true;
    else config.snipe = false;

    if (settings.askSave && await util.selectYN("Save")){
      profiles[config.email] = config;
      fs.writeFileSync('../json/profiles.json', JSON.stringify(profiles));
    }
  }

  console.log();


  return config;

}

exports.init = init;
