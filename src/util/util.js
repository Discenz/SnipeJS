/*
 * Util Functions
 * Author: Discens
*/

const fs = require('fs');
const logger = require('./logger');

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
