//Calculates min, max, average latency, tries to snipe early by those 3 times.
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

const preSnipe = async () => {
  console.log("Preparing to snipe in 20s");

  let arr = [];
  for(let i=0; i<5; i++) arr[i] = (await util.ping())/2;

  let avg = arr[0];
  let min = arr[0];
  let max = arr[0];

  for(let i=1; i<5; i++){
    if(arr[i]>max) max = arr[i]
    if(arr[i]<min) min = arr[i]
    avg += arr[i]
  }

  avg /= 5

  console.log("Average latency is "+parseInt(avg)+"ms.");
  console.log("Maximum latency is "+parseInt(max)+"ms.");
  console.log("Minimum latency is "+parseInt(min)+"ms.");

  //Timing all of the snipes
  setTimeout(snipe, snipeTime.getTime() - new Date() - avg);
  setTimeout(snipe, snipeTime.getTime() - new Date() - max);
  setTimeout(snipe, snipeTime.getTime() - new Date() - min);
}

const setup = (time, id) => {
  snipeTime = time;
  uuid = id;
  setTimeout(preSnipe, snipeTime.getTime() - new Date() - 20000);
}


exports.setup = setup;
