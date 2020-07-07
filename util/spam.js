//Spams at max ping calculated 10 mins earlier.
const util = require('../util/util');
const config = require('../config.json');

const axios = require('axios');

let snipeTime, uuid;
const auth = "Bearer " +config.bearer;
const json = {name: config.target, password: config.password};

const snipe = () => {
  axios.post(
    "https://api.mojang.com/user/profile/"+uuid+"/name",
    json,
    {headers: {
      "Authorization": auth
    }}
  ).then(function (response){
      console.log(response);
  }).catch(function (error) {
      console.log("Snipe failed!")
      console.log(error);
  });
}

const sniper = () => {
  //Spam
  for(let i=0; i<20; i++) snipe();
}


const preSnipe = async () => {
  console.log("Preparing to snipe in 20s");

  let arr = [];
  for(let i=0; i<5; i++) arr[i] = await util.ping();

  let max = arr[0];

  for(let i=1; i<5; i++){
    if(arr[i]>max) max = arr[i]
  }

  console.log("Maximum latency is " + parseInt(max) + "ms.");

  setTimeout(sniper, snipeTime.getTime() - new Date() - max);
}

const setup = (time, id) => {
  snipeTime = time;
  uuid = id;
  setTimeout(preSnipe, snipeTime.getTime() - new Date() - 600000);
}


exports.setup = setup;
