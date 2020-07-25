const util = require('./util/util');
const auth = require('./util/auth');
const conf = require('./util/conf');
const logger = require('./util/logger');

const prompt = require('prompt-sync')();

util.printTitle();

//Configuration
let config = conf.init();

//Initializing
const init = async () => {
    //Authentication
    const json = await auth.init(config);

    console.log();

    config.target = prompt('Please input target: ')

    console.log();

    //Get time
    snipeTime = await util.getAvailableTime(config.target);

    const converted = util.convertTime((snipeTime.getTime()-new Date()));
    logger.info(config.target+" is available in "+converted[0]+" "+converted[1]);

    const sniper = require('./snipes/spam');
    sniper.setup(snipeTime, config, json);
}

init();
