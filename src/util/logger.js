/*
 * SnipeJS Logger
 * Author: Discens
*/

const chalk = require('chalk')

const info = (msg) => {
  console.log(chalk.blue("[INFO] ") + msg);
}

const warn = (msg) => {
  console.log(chalk.yellow("[WARN] ") + msg);
}

const error = (msg) => {
  console.log(chalk.red("[ERROR] ") + msg);
  process.exit();
}

exports.info = info;
exports.error = error;
exports.warn = warn;
