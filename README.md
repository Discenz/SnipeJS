# SnipeJS

[![Discord](https://img.shields.io/badge/chat-on%20discord-brightgreen.svg)](https://discord.gg/94MgDaP)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SnipeJS is an opensource Minecraft name sniper written in JavaScript. License of SnipeJS is MIT, feel free to fork the repository or modify the code.

> **[IMPORTANT]** SnipeJS is in early development and is not fuly functional as of 11/6/2020.

## Contributors

* [Discens](https://github.com/Virachoca) - Main developer

For a full list of contributors, see `doc/contributors.md`

## Configuration

To be able to snipe a name, you must enter your credentials and bearer token into the config.json file. It should look something like this:

```json
{
    "username": "",
    "password": "",
    "bearer": "",
    "questions": ["", "", ""],
    "target": "",
    "method": ""
}
```

You can obtain the bearer token by logging in to minecraft.net and using [EditThisCookie](http://www.editthiscookie.com) to find the bearer token. Note that the token will quickly expire and an alternative method to obtaining token is being explored.

## Usage

*NodeJS is required to run SnipeJS*

* Clone the repository with `git clone https://github.com/Virachoca/SnipeJS.git`
* Install all dependencies using `npm ci`
* Create a `config.json`
* Start sniping using `node snipe.js`

See full doc in `doc/documentation.md`

## LICENSE
[LICENSE](LICENSE)
