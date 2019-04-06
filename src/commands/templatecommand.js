const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.ban)) return message.reply("You don't have the right to ban someone.");

    // Get mentioned user.
    let mentionUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    // Check if the user exist.
    if (!mentionUser) return message.reply("Couldn't find the user");
    // Check mentioned user permission.
    if (mentionUser.hasPermission(permissions.ban)) return message.reply(`${mentionUser} can't be banned!`);
        
    // Delete your own command.
    await message.delete().catch();
}

module.exports.config = {
    name: "base",
    aliases: [],
    usage: "",
    description: ""
}