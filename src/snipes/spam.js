const logger = require('../util/logger')

const axios = require('axios');

let snipeTime, uuid, auth, json;

const snipe = () => {
  axios.post(
    "https://api.mojang.com/user/profile/"+uuid+"/name",
    json,
    {headers: {
      "Authorization": auth
    }}
  ).then(function (response){
      console.log(response.data);
  }).catch(function (error) {
      console.log("Snipe failed!")
      console.log(error);
  });
}

const sniper = () => {
  console.info("Attempting to snipe")
  for(let i=0; i<20; i++) snipe();
}

const setup = (time, config, auth) => {
  snipeTime = time;
  uuid = auth.id;
  token = "Bearer " +auth.token;
  json = {name: config.target, password: config.password}

  setTimeout(sniper, snipeTime.getTime() - new Date() - 1000);
}


exports.setup = setup;
