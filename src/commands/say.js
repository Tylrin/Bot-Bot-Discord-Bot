const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.say)) return  message.reply("You can't use the !say command.");

    // Delete your own command.
    await message.delete().catch(); 

    // Get message.
    let botMessage = arguments.join(" ").trim();

    // Send message.
    message.channel.send(botMessage);
};

module.exports.config = {
    name: "say",
    aliases: ["s"],
    usage: "<prefix>say <message>",
    description: ""
};