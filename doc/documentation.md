# In depth usage of SnipeJS

> **[IMPORTANT]** This document is deprecated as of 26/7/2020, will be updated with new usage in future

## Prerequisites:
- [NodeJS](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads) (optional)

## Usage

1. Install prerequisites through provided websites. Git is optional but recommended.
2. Either download repository with the command below or download the zip file like so:

```bash
git clone https://github.com/Discenz/SnipeJS.git
```


![go to github.com/discenz/SnipeJS and click on clone then download zip.](https://media0.giphy.com/media/mCCVGiIFd0TILxzXlM/giphy.gif)

I recommend downloading SnipeJS with Git because it will be easier to update to newer versions of SnipeJS in the future. Note: you can do that by going into the "SnipeJS" directory created when cloning the repository with the "cd" command and get the latest release by typing "git pull".

3. add a file name "config.json" to the main directory of SnipeJS and put this into the file:

```json
{
    "username": "your username",
    "password": "your password",
    "bearer": "insert bearer token here",
    "questions": ["question 1 answer", "question 2 answer", "question 3 answer"],
    "target": "name you want to snipe",
    "method": "spam or multi"
}
```

Fill out all of the fields except the bearer token; we will do this right before sniping the name.

4. Install required packages: while in the main directory of SnipeJS, in a terminal, enter the command "npm ci".

5. Get bearer token: To do this you need the chrome extension [EditThisCookie](http://www.editthiscookie.com). Once you have that extension installed, login to the Minecraft account your are sniping the name on to and do this:
![Login to minecraft, click on the edit this cookie icon, find your bearer token, , and put it into config.json.](https://media2.giphy.com/media/jpzdSpg06hxURc8ijs/giphy.gif) Afterwards, make sure to save the file. The bearer token expires quickly so it is recommended to do this right before sniping the name.

6. Snipe the name: to snipe the name you need to go into the main directory of SnipeJS and run the command "node snipe.js".

If you need more assistance you can join the Discord [here](https://discord.gg/94MgDaP) and ask for more assistance there.
> Note: SnipeJS is still in early development and the timing is being worked on.
