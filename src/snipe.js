const util = require('./util/util');
const auth = require('./util/auth');
const conf = require('./util/conf');
const http = require('./util/http');
const logger = require('./util/logger');

const init = async () => {
    util.printTitle();

    if(await util.checkForUpdate()) logger.warn("You are on an outdated version of SnipeJS");

    const delay = await http.getTime() - new Date();
    if (Math.abs(delay) > 30) logger.warn(`Clock is out of sync (${delay} ms)`);

    let config = await conf.init();
    const authentication = await auth.init(config);

    console.log();
    config.target = util.prompt('Please input target: ')
    console.log();

    snipeTime = await http.getAvailableTime(config.target);
    const converted = util.convertTime(snipeTime.getTime()-new Date());
    logger.info(config.target+" is available in "+converted[0]+" "+converted[1]);

    let reauth = false;
    if ((snipeTime-authentication.authTime) > 50000) reauth = true;

    const sniper = require('./snipes/spam');
    sniper.setup(snipeTime, config, authentication, reauth);
}

init();
