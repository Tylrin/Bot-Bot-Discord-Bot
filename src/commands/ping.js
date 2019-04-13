const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.ping)) return message.reply(response.chooseMessageResponse(personality.command.ping.permission, message));

    // Message channel.
    message.channel.send("Pinging...").then(msg => {
        // Measure the ping of the message.
        let ping = msg.createdTimestamp - message.createdTimestamp;

        // Edit message
        msg.edit((response.chooseMessageResponse(personality.command.ping.notify, message)));

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
    aliases: ["latency"],
    usage: "<prefix>ping",
    description: ""
}