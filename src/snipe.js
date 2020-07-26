const util = require('./util/util');
const auth = require('./util/auth');
const conf = require('./util/conf');
const http = require('./util/http');
const logger = require('./util/logger');

const readlineSync = require('readline-sync');
const prompt = readlineSync.question;

const init = async () => {
    util.printTitle();

    const delay = await http.getTime() - new Date();
    if (Math.abs(delay) > 30) logger.warn(`Clock is out of sync (${delay} ms)`);

    let config = conf.init();
    const authentication = await auth.init(config);

    console.log();
    config.target = prompt('Please input target: ')
    console.log();

    snipeTime = await http.getAvailableTime(config.target);
    const converted = util.convertTime((snipeTime.getTime()-new Date()));
    logger.info(config.target+" is available in "+converted[0]+" "+converted[1]);

    const sniper = require('./snipes/spam');
    sniper.setup(snipeTime, config, authentication);
}

init();
