const Discord = require("discord.js");
const Permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.ban)) { // Check permission for the command.
        message.reply("You don't have the right to ban someone.")
        return;
    };
    let mentionUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); // Get mentioned user.
    if (!mentionUser) { // Check if the user exist.
        message.reply("Couldn't find the user")
        return; 
    };
    if (mentionUser.hasPermission(Permissions.banPermission)) { // Can the user be banned.
        message.reply(`${mentionUser} can't be banned!`)
        return; 
    };
    await message.delete().catch(); // Delete your own command.
}

module.exports.config = {
    name: "base",
    aliases: []
}