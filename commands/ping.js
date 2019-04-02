const Discord = require("discord.js");
const Permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.ping)) { // Check permission for the command.
        message.reply("You don't have the right to play ping.")
        return;
    };
    message.reply("Pong!");
}

module.exports.config = {
    name: "ping",
    aliases: []
}