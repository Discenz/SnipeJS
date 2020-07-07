const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');

const printTitle = () => {
  console.log(fs.readFileSync("./doc/title.txt").toString());
}

const getDir = (path) => {
  return fs.readdirSync(path);
}

const convertTime = (time) => {
  const times = [1000, 60000, 3600000, 86400000];
  const units = ["s", "min", "hr", "days"];
  let arr = [time, "ms"];
  for(const i in times) if(time > times[i]) arr = [Math.floor(time/times[i]), units[i]];
  return arr;
}

const ping = async () => {
  const before = new Date();
  const req = await axios.get("https://api.mojang.com/");
  const after = new Date();

  if(req.status != 200) return null;

  return (after-before);
}

const getUUID = async (name) => {
  const req = await axios.get("https://api.mojang.com/users/profiles/minecraft/"+name);

  if(req.status != 200) error("[ERROR] Failed to fetch UUID for "+name);

  return req.data.id;
}

const getAvailableTime = async (name) => {
    const req = await axios("https://namemc.com/name/"+name);
    if(req.status != 200) error("[ERROR] Could not connect to NameMC.");

    const $ = cheerio.load(req.data);

    if($('.my-1').text().match(/Available/) == null) error("[ERROR] "+name+" is not available");

    const time = new Date(Object.values(Object.values($('.countdown-timer'))[0].attribs)[1]);

    return time;
}

const auth = async (config) => {
  let getQuestions = await axios.get(
    "https://api.mojang.com/user/security/challenges",
    {headers: {
      "Authorization": "Bearer "+config.bearer
    }}
  ).catch(function (error) {
    return false;
  });

  if(getQuestions.status != 200) return false;

  if (getQuestions.data.length == 0) return true;

  let answer = [];

  for(let i=0; i<3; i++){
    answer.push({
        id: getQuestions.data[i].answer.id,
        answer: config.questions[i]
    });
  }

  let answerPost = await axios.post(
    "https://api.mojang.com/user/security/location",
    answer,
    {headers: {
      "Authorization": auth
    }}
  ).catch(function (error) {
    return false;
  });

  return true;
}

const error = (msg) => {
  console.log(msg);
  process.exit();
}

exports.convertTime = convertTime;
exports.auth = auth;
exports.printTitle = printTitle;
exports.ping = ping;
exports.error = error;
exports.getUUID = getUUID;
exports.getAvailableTime = getAvailableTime;
exports.getDir = getDir;
