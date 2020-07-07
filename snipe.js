const util = require('./util/util');
const config = require('./config.json');

util.printTitle();

//Checks for issues that could be problematic in the future
if(config.username == undefined) util.error("[ERROR] No username in config!");
if(config.password == undefined) util.error("[ERROR] No password in config!");
if(config.bearer == undefined) util.error("[ERROR] No token in config!");
if(config.target == undefined) util.error("[ERROR] No target in config!");
if(config.method == undefined) util.error("[ERROR] No sniper method specified!");

//Checks if sniper dependency is correctly inputed in config
const methods = util.getDir('./util').join(' ');
if(methods.match(new RegExp(config.method)) == null) util.error("[ERROR] "+config.method+" method does not exist.");

const sniper = require('./util/'+config.method+'.js');

//Initializing
let uuid, snipeTime;
const init = async () => {
    uuid = await util.getUUID(config.username);
    snipeTime = await util.getAvailableTime(config.target);

    let auth = await util.auth(config);
    if(!auth) util.error("[ERROR] Could not authenticate "+config.username);

    const converted = util.convertTime((snipeTime.getTime()-new Date()))
    console.log(config.target+" is available in "+converted[0]+" "+converted[1]);

    sniper.setup(snipeTime, uuid);
}

init();
