const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.dice)) return message.reply("You don't have the right to roll dice.");

    // Delete your own command.
    await message.delete().catch();

    // Calculate response.
    let diceNumber = Math.floor(Math.random() * (6 - 1 + 1) ) + 1;
    message.channel.send(`You rolled a ${diceNumber}`);
}

module.exports.config = {
    name: "dice",
    aliases: []
}