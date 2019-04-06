const Discord = require("discord.js");
const ms = require("ms");
const permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.unmute)) return message.reply("You don't have the right to unmute someone.");

    // Get mentioned user.
    let unmuteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    // Check if the user exist.
    if (!unmuteUser) return message.reply("Couldn't find the user");
    // Check mentioned user permission.
    if (unmuteUser.hasPermission(permissions.unmute)) return message.reply(`${unmuteUser} can't be unmuted!`);

    // Delete your own command.
    await message.delete().catch();

    // Get mute role.
    let muteRole = message.guild.roles.find("name", "muted");
    // Check if role exists.
    if (!muteRole) return message.channel.send("There is no mute role!")

    // Remove the role from the user.
    await unmuteUser.removeRole(muteRole.id)

    try {
        await unmuteUser.send(`You have been unmuted in ${message.guild.name}`);
    } catch(err) {
        console.log(`${unmuteUser.user.tag} coudn't be DMed because of this error. ${err}`);
    }
}

module.exports.config = {
    name: "unmute",
    aliases: [],
    usage: "",
    description: ""
}