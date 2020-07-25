/*
 * Util Functions
 * Author: Discens
*/


const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
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


const getAvailableTime = async (name) => {
    const req = await axios("https://namemc.com/name/"+name);
    if(req.status != 200) error("[ERROR] Could not connect to NameMC.");

    const $ = cheerio.load(req.data);

    if($('.my-1').text().match(/Available/) == null) logger.error(name+" is not available");

    const time = new Date(Object.values(Object.values($('.countdown-timer'))[0].attribs)[1]);

    return time;
}

exports.convertTime = convertTime;
exports.printTitle = printTitle;
exports.getAvailableTime = getAvailableTime;
