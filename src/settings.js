const util = require('./util/util');
const auth = require('./util/auth');
const conf = require('./util/conf');
const http = require('./util/http');
const logger = require('./util/logger');

const fs = require('fs');

let settings = JSON.parse(fs.readFileSync("../json/settings.json"));

const init = async () => {
    util.printTitle();
    while(true){
      const choice = await util.selectClean("Settings", ["Profiles", "Exit"]);
      if (choice == "Exit") process.exit();
    }

}

init();
