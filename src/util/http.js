/*
 * HTTP requests
 * Authors: Discens
*/

const cheerio = require('cheerio');
const axios = require('axios');

const logger = require('./logger');

const snipe = (uuid, token, json) => {
  axios.post(
    "https://api.mojang.com/user/profile/"+uuid+"/name", json, {headers: {"Authorization": token}}
  ).then(function (response){
      logger.info("Name sniped!")
      console.log(response.data);
  }).catch(function (error) {
      logger.warn("Snipe failed! at " + (snipeTime- new Date()) + "ms");
      console.log(error.response.data);
  });
}

const block = (target, token) => {
  axios.post(
    "https://api.mojang.com/user/profile/agent/minecraft/name/"+target, {headers:{'Authorization': token}}
  ).then(function (response){
      logger.info("Name Blocked!");
      console.log(response.data);
  }).catch(function (error) {
      logger.warn("Block failed! at " + (snipeTime- new Date()) + "ms");
      console.log(error.response.data);
  });
}

const ping = async () => {
  const before = new Date();
  const req = await axios.get("https://api.mojang.com/");
  const after = new Date();

  if(req.status != 200) return null;

  return (after-before);
}

const getAvailableTime = async (name) => {
    const req = await axios("https://namemc.com/name/"+name);
    if(req.status != 200) logger.error("Could not connect to NameMC.");

    const $ = cheerio.load(req.data);

    if($('.my-1').text().match(/Available/) == null) logger.error(name+" is taken");
    if($('.my-1').text().match(/Available Later/) == null) logger.error(name+" is already available");

    const time = new Date(Object.values(Object.values($('.countdown-timer'))[0].attribs)[1]);

    return time;
}

const getUUID = async (name) => {
  const req = await axios.get("https://api.mojang.com/users/profiles/minecraft/"+name);

  if(req.status != 200) logger.error("Failed to fetch UUID for "+name);

  return req.data.id;
}

const getTime = async () => {
  const req = await axios.get("https://worldtimeapi.org/api/ip");

  if(req.status != 200) logger.warn("Could not connect to World Time API.");

  return (new Date(req.data.datetime));
}

const remotePackage = async () => {
  const req = await axios("https://raw.githubusercontent.com/Discenz/SnipeJS/master/package.json");
  if(req.status != 200) logger.error("Could not connect to GitHub");
  return req.data;
}

exports.getAvailableTime = getAvailableTime;
exports.getTime = getTime;
exports.getUUID = getUUID;
exports.ping = ping;
exports.remotePackage = remotePackage;
