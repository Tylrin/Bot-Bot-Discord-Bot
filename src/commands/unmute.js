const Discord = require("discord.js");
const ms = require("ms");
const permissions = require("../utilities/commandpermission.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.unmute)) return message.reply(response.chooseMessageResponse(personality.command.unmute.permission, message));

    // Get mentioned user.
    let unmuteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    // Check if the user exist.
    if (!unmuteUser) return message.reply(response.chooseMessageResponse(personality.command.unmute.nouser, message));

    // Delete your own command.
    await message.delete().catch();

    // Get mute role.
    let muteRole = message.guild.roles.find("name", "muted");
    // Check if role exists.
    if (!muteRole) return message.channel.send(response.chooseMessageResponse(personality.command.unmute.norole, message));

    // Remove the role from the user.
    await unmuteUser.removeRole(muteRole.id)

    try {
        await unmuteUser.send(response.chooseMessageResponse(personality.command.unmute.notify, message));
    } catch(err) {
        console.log(`[error] ${unmuteUser.user.tag} coudn't be DMed because of this error. ${err}`);
    }
}

module.exports.config = {
    name: "unmute",
    aliases: [],
    usage: "<prefix>unmute <user>",
    description: ""
}