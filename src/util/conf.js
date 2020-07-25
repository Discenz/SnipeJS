/*
 * Configuration Setup
 * Author: Discens
*/

const fs = require('fs');
const prompt = require('prompt-sync')();

const logger = require('./logger');

const init = () => {

  let config = {};

  if (fs.existsSync('../config.json')) {
    config = JSON.parse(fs.readFileSync('../config.json'));

    if(config.email == undefined) logger.error("No email in config!");
    if(config.password == undefined) logger.error("No password in config!");
  }

  else {
    logger.warn("Configuration not found! Input credentials\n");

    config.email = prompt('Email: ');
    config.password = prompt('Password: ');

    const save = prompt('Save (Y/N): ');

    if (save.toUpperCase() == 'Y') {
      fs.writeFileSync('../config.json', JSON.stringify(config));
    }

    console.log();

  }

  return config;

}

exports.init = init;
