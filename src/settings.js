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
      let groups = Object.keys(settings);
      groups.push("Reset", "Exit");
      const choice = await util.selectClean("Settings Manager", groups);

      if (choice == "Reset") settings = await http.remoteSettings();
      else if (choice == "Exit") process.exit();

      for (let i=0; i<groups.length-2; i++){
        if(choice == groups[i]){
          while(true){
            let groupSettings = Object.keys(settings[groups[i]]);
            let groupValues = Object.values(settings[groups[i]]);
            for (let j=0; j<groupSettings.length; j++) groupSettings[j] += " (" + groupValues[j]+")";
            groupSettings.push("Back");
            const settingsChoice = await util.selectClean(groups[i], groupSettings);

            if(settingsChoice == "Back") break;
            else settings[groups[i]][settingsChoice] = !settings[groups[i]][settingsChoice];

          }
          break;
        }
      }
    }

}

init();
