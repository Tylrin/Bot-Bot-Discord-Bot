const Discord = require("discord.js");
const ms = require("ms");
const Permissions = require("../utilities/commandpermission.json");
const Color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.unmute)) { // Check permission for the command.
        message.reply("You don't have the right to unmute someone.")
        return;
    };
    let unmuteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); // Get mentioned user.
    if (!unmuteUser) { // Check if the user exist.
        message.reply("Couldn't find the user")
        return; 
    };
    if (unmuteUser.hasPermission(Permissions.unmute)) { // Can the user be banned.
        message.reply(`${unmuteUser} can't be unmuted!`)
        return; 
    };
    await message.delete().catch(); // Delete your own command.

    let muteRole = message.guild.roles.find(`name`, 'muted');
    if (!muteRole) return message.channel.send("There is no mute role!")

    await unmuteUser.removeRole(muteRole.id)

    try {
        await unmuteUser.send(`You have been unmuted in ${message.guild.name}`);
    } catch(err) {
        console.log(`${unmuteUser} coudn't be DMed because of this error. ${err}`);
    }
}

module.exports.config = {
    name: "unmute",
    aliases: []
}