const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.ping)) return message.reply("You don't have the right to test the ping.");

    // Message channel.
    message.channel.send("Pinging...").then(msg => {
        // Measure the ping of the message.
        let ping = msg.createdTimestamp - message.createdTimestamp;

        // Calculate response.
        let choices = ["Is it really my ping?", "Is it okay? I can't look!", "I hope it isn't bad!"];
        let response = choices[Math.floor(Math.random() * choices.length)];

        // Edit message
        msg.edit(response);

        // Create embed.
        let pingEmbed = new Discord.RichEmbed()
        .setDescription("Latency")
        .setColor(color.ping)
        .addField("Bot Latency", ping)
        .addField("API Lateny", Math.round(client.ping));

        message.channel.send(pingEmbed);
    });
}

module.exports.config = {
    name: "ping",
    aliases: ["latency"]
}