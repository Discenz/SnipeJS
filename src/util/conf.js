/*
 * Configuration Setup
 * Author: Discens
*/

const fs = require('fs');

const logger = require('./logger');
const util = require('./util');

const init = async () => {

  let config = {};

  if (fs.existsSync('../config.json')) {
    config = JSON.parse(fs.readFileSync('../config.json'));

    if(config.email == undefined) logger.error("No email in config!");
    if(config.password == undefined) logger.error("No password in config!");
  }

  else {
    logger.warn("Configuration not found! Input credentials\n");

    config.email = util.prompt('Email: ');
    config.password = util.prompt('Password: ', {noEchoBack: true});

    if (await util.selectYN("Save")) fs.writeFileSync('../config.json', JSON.stringify(config));

    console.log();

  }

  return config;

}

exports.init = init;
