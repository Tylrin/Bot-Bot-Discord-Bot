const { Client, Collection } = require("discord.js");

const client = new Client();
client.config = require("./config.json");
client.botConfig = require("./config.bot.json");
client.botInfo = require("./package.json");

["commands", "aliases"].forEach(c => (client[c] = new Collection()));
["console", "command", "event"].forEach(h =>
	require(`./src/handlers/${h}`)(client)
);

client.login(client.config.token);
