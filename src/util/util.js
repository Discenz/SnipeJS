/*
 * Util Functions
 * Author: Discens
*/

const fs = require('fs');
const logger = require('./logger');
const cliSelect = require('cli-select');
const chalk = require('chalk');
const readlineSync = require('readline-sync');

const prompt = (msg, args) => {
  return readlineSync.question(chalk.green("? ") + msg, args);
}

const selectYN = async (msg) => {
  console.log(chalk.green("? ")+msg)
  const choice = await cliSelect({
      selected: chalk.blue.bold('>'),
      unselected: ' ',
      values: ['No', 'Yes'],
      valueRenderer: (value, selected) => {
          if (selected) {
              return chalk.blue.bold(value);
          }

          return value;
      },

  }).catch(() => {
    process.exit();
  });

  console.log("> "+choice.value)
  return choice.id
}

const select = async (msg, choices) => {
  console.log(chalk.green("? ")+msg)
  const choice = await cliSelect({
      selected: chalk.blue.bold('>'),
      unselected: ' ',
      values: choices,
      valueRenderer: (value, selected) => {
          if (selected) {
              return chalk.blue.bold(value);
          }

          return value;
      },

  }).catch(() => {
    process.exit();
  });
  console.log("> "+choice.value);
  return choice.value
}

const printTitle = () => {
  console.log(fs.readFileSync("../doc/title.txt").toString());
}

const convertTime = (time) => {
  const times = [1000, 60000, 3600000, 86400000];
  const units = ["s", "min", "hr", "days"];
  let arr = [time, "ms"];
  for(const i in times) if(time > times[i]) arr = [Math.floor(time/times[i]), units[i]];
  return arr;
}

exports.convertTime = convertTime;
exports.printTitle = printTitle;
exports.selectYN = selectYN;
exports.select = select;
exports.prompt = prompt;
