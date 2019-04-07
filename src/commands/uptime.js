const Discord = require("discord.js");
const Permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(Permissions.uptime)) return message.reply("You don't have the right to see the bot's uptime.");

    // Calculate time as string.
    function duration(ms) {
        const sec = Math.floor((ms / 1000)% 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${day.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
    }

    message.channel.send(`I have been online for: ${duration(client.uptime)}`);
}

module.exports.config = {
    name: "uptime",
    aliases: [],
    usage: "<prefix>uptime",
    description: ""
}