const logger = require('../util/logger')

const axios = require('axios');

let snipeTime, uuid, token, json;

const snipe = () => {
  axios.post(
    "https://api.mojang.com/user/profile/"+uuid+"/name",
    json,
    {headers: {
      "Authorization": token
    }}
  ).then(function (response){
      console.log(response.data);
  }).catch(function (error) {
      logger.warn("Snipe failed! at" + (snipeTime- new Date()) + "ms");
      console.log(error.response.data);
  });
}

const sniper = () => {
  logger.info("Attempting to snipe")
  for(let i=0; i<20; i++) snipe();
}

const setup = (time, config, auth) => {
  snipeTime = time;
  uuid = auth.id;
  token = "Bearer " +auth.token;
  json = {name: config.target, password: config.password}

  setTimeout(sniper, (snipeTime - new Date() - 1000));
}


exports.setup = setup;
