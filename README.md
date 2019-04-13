# The Source Bot
This is a project of a basic discord bot. It is meant to be a pretty generic and bear bones discord bot that serves a starting ground for more custom bots.

This project is largly based on the code from a couple of youtube series by the name of:
- [Discord.js Bot Development](https://www.youtube.com/watch?v=Z-tc91hArlM&list=PLdnyVeMcpY7-GfaXaWBOb3ZQkJxP53BIx) by [{TheSourceCode}](https://www.youtube.com/channel/UCNXt2MrZaqfIBknamqwzeXA)
- [Discord.JS Coding Tutorials](https://www.youtube.com/watch?v=UcLspwognk0&list=PLWnw41ah3I4ZfNLV3by7nB6JO2WcCc3Wj) by [[MenuDocs]](https://www.youtube.com/channel/UCpGGFqJP9vYvzFudqnQ-6IA)
- [Coding Your Own Discord Bot - NEW](https://www.youtube.com/watch?v=RZ02rw3NZnk&list=PLS6sInD7ThM0MTsu88RyxhTI187ScqRmm) by [Dapper Dino - Coding Tutorials](https://www.youtube.com/channel/UCjCpZyil4D8TBb5nVTMMaUw).

## About

discord.js is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the
[Discord API](https://discordapp.com/developers/docs/intro).

- Object-oriented
- Predictable abstractions
- Performant
- 100% coverage of the Discord API

## Installation

**Node.js 8.0.0 or newer is required.**  
Ignore any warnings about unmet peer dependencies, as they're all optional.

```bash
npm install discord.js
npm install ms
npm install giphy-api --save
npm install superagent --save
npm install stjs
```

### Token

- [Discord Client Token](https://discordapp.com/developers/applications/555802582988357663/information)
- [GIPHY API Access Token](https://giphy.com/)

## Start Up

Add a config.json with the access tokens for your external services, in the root of your project folder.

```json
{
    "token": "Discord-API-Token",
    "giphyToken": "Giphy-API-TOKEN"
}
```

## General Information
- [Discord Documetation](https://discord.js.org/#/)
- [GIPHY GitHub Project Documentation](https://github.com/austinkelleher/giphy-api)
- [Superagent GitHub Documentation](https://github.com/visionmedia/superagent)
- [Selecttransform GitHub Documentation](https://selecttransform.github.io/site/)