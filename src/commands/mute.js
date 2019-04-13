const Discord = require("discord.js");
const ms = require("ms");
const permissions = require("../utilities/commandpermission.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.mute)) return message.reply(response.chooseMessageResponse(personality.command.mute.permission, message));

    // Get mentioned user.
    let muteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    // Check if the user exist.
    if (!muteUser) return message.reply(response.chooseMessageResponse(personality.command.mute.nouser, message));
    // Check mentioned user permission.
    if (muteUser.hasPermission(permissions.mute)) return  message.reply(response.chooseMessageResponse(personality.command.mute.nopermission, message));

    // Delete your own command.
    await message.delete().catch(); 

    // Get mute role.
    let muteRole = message.guild.roles.find(`name`, 'muted');
    // If it doesn't exist, create it.
    if (!muteRole) {
        try {
            muteRole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(err) {
                console.log(err.stack);
        }
    }
    // Set mute time
    let muteTime = arguments[1];
    if (!muteTime) return message.reply(response.chooseMessageResponse(personality.command.mute.notime, message));

    // Add the role to the user.
    await (muteUser.addRole(muteRole.id));

    try {(
        await muteUser.send(response.chooseMessageResponse(personality.command.mute.notify, message, ms(ms(muteTime)))));
    } catch(err) {
        console.log(`[error] ${muteUser.user.tag} coudn't be DMed because of this error. ${err}`);
    }
}

module.exports.config = {
    name: "mute",
    aliases: ["silence"],
    usage: "<prefix>mute <user> <time>",
    description: ""
}