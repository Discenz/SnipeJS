/*
 * Util Functions
 * Author: Discens
*/

const fs = require('fs');
const cliSelect = require('cli-select');
const chalk = require('chalk');
const readlineSync = require('readline-sync');
const ansi = require('ansi-escapes');

const logger = require('./logger');
const http = require('./http');

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

const selectClean = async (msg, choices) => {
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
  process.stdout.write(ansi.eraseLines(2));
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

const convertVersion = (version) => {
  let arr = version.split(".");
  for (let i=0; i<arr.length; i++) arr[i] = parseInt(arr[i]);
  return arr;
}

const compareVersion = (local, remote) => {
  local = convertVersion(local);
  remote = convertVersion(remote);

  for(let i=0;i<3;i++) if(remote[i]> local[i]) return true;

  return false;
}

const checkForUpdate = async () => {
  let local = JSON.parse(fs.readFileSync("../package.json")).version;
  let remote = (await http.remotePackage()).version;

  return compareVersion(local, remote);
}

exports.checkForUpdate = checkForUpdate;
exports.convertTime = convertTime;
exports.printTitle = printTitle;
exports.selectYN = selectYN;
exports.select = select;
exports.prompt = prompt;
exports.selectClean = selectClean;
