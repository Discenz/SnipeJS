const logger = require('../util/logger')
const auth = require('../util/auth')
const http = require('../util/http')

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
      logger.warn("Snipe failed! at " + (snipeTime- new Date()) + "ms");
      console.log(error.response.data);
  });
}

const sniper = () => {
  logger.info("Attempting to snipe")
  for(let i=0; i<5; i++) snipe();
}

const preSnipe = async (reauth, authentication, config) => {
  logger.info("Preparing to snipe in 30s");
  if(reauth){
    authentication = await auth.init(config);
    logger.info("Reauthentication succesful");
  }
  token = "Bearer " +authentication.token;

  let max = 0;
  for(let i=0; i<3; i++){
    const delay = await http.ping();
    if(delay>max) max = delay;
  }
  logger.info("Latency is "+max+"ms.");

  setTimeout(sniper, (snipeTime - new Date() - max - 10));
}

const setup = (time, config, authentication, reauth) => {
  snipeTime = time;
  uuid = authentication.id;
  json = {name: config.target, password: config.password}

  setTimeout(preSnipe, (snipeTime - new Date() - 30000), reauth, authentication, config);
}


exports.setup = setup;
