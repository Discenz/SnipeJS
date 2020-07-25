# SnipeJS

[![Discord](https://img.shields.io/badge/chat-on%20discord-brightgreen.svg)](https://discord.gg/94MgDaP)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SnipeJS is an opensource Minecraft name sniper written in JavaScript. License of SnipeJS is MIT, feel free to fork the repository or modify the code.

## Contributors

* [Discens](https://github.com/Discenz) - Main developer

For a full list of contributors, see `doc/contributors.md`

## Configuration

To be able to snipe a name, you must enter your credentials and security questions into the config.json file (or type them into the program when queried). It should look something like this:

```json
{
    "email": "",
    "password": "",
    "questions": ["", "", ""]
}
```

## Usage

*NodeJS is required to run SnipeJS*

* Clone the repository with `git clone https://github.com/Discenz/SnipeJS.git`
* Install all dependencies using `npm ci`
* Create a `config.json` (optional)
* Start sniping using `node snipe.js`

See full doc in `doc/documentation.md`

## License
SnipeJS is licensed under the [MIT](LICENSE) license.
