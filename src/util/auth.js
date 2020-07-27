/*
* Mojang Authentication
* Authors: Exist, Discens
*/

const axios = require('axios');
const fs = require('fs');

const logger = require('./logger');
const util = require('./util');

const init = async (config) => {
	const auth = await authenticate(config.email, config.password);
	const chal = await challenges(auth.token, config);
	const val= await validate(auth.token);

	return auth;
}

const authenticate = async (email, password) => {
  const json = {
      agent: { name: "Minecraft", version: 1 }, username: email, password: password
  }
  const req = await axios.post("https://authserver.mojang.com/authenticate", json, {
      headers: {
          // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
          "Content-Type": "application/json"
      }
  });

  if (req.status != 200) logger.error(`Could not authenticate: ${email}`);

  const res = {token: req.data.accessToken, name: req.data.selectedProfile.name, id: req.data.selectedProfile.id, authTime: new Date()}

  logger.info(`Succesfully authenticated ${res.name}.`);

  return res;
}

const challenges = async (token, config) => {
  const getQuestions = await axios.get(
    "https://api.mojang.com/user/security/challenges",
    {headers: {
      "Authorization": "Bearer "+ token
    }}
  ).catch(function (error) {
    logger.error("Could not access Mojang API.");
  });

  if(getQuestions.status != 200) logger.error("Could not get challenges.");

  if (getQuestions.data.length == 0) return;

  let answer = [];
  let flag = false;

  if(config.questions == undefined) {
    console.log();
    flag = true;
    logger.warn("Security questions not in configuration.")
    config.questions = [];
  }

  for(let i=0; i<3; i++){
    if(flag) config.questions.push(util.prompt(getQuestions.data[i].question.question+" "));

    answer.push({
        id: getQuestions.data[i].answer.id,
        answer: config.questions[i]
    });
  }

  if(flag) {
    let newConf = {email:config.email, password:config.password, questions:config.questions}
		if (await util.selectYN("Save")) fs.writeFileSync('../config.json', JSON.stringify(newConf));
  }

  const answerPost = await axios.post(
    "https://api.mojang.com/user/security/location",
    answer,
    {headers: {
      "Authorization": "Bearer "+token
    }}
  ).catch(function (error) {
   logger.error("Could not answer challenges.");;
  });

  return;
}

// //Refresh request. Does not work without client token?
// const refresh = async (token) => {
//   const bearerPayload = {
//       accessToken: token
//   }
//
//   const req = await axios.post("https://authserver.mojang.com/refresh", bearerPayload, {
//       headers: {
//           "Content-Type": "application/json"
//       }
//   });
//
//   if (req.status != 200) return logger.error(`Could not refresh token.`);
//
//   return req.data.accessToken;
// }
//

const validate = async (token) => {
  const bearerPayload = {
      accessToken: token
  }
  const req = await axios.post("https://authserver.mojang.com/validate", bearerPayload, {
      headers: {
          "Content-Type": "application/json"
      }
  });
  if (req.status != 204) return logger.error(`Could not validate.`);
  return true;
}

exports.init = init;
