const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.removerole)) return message.reply(response.chooseMessageResponse(personality.command.removerole.permission, message));

    // Get mentioned user.
    let targetUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); 
    // Check if the user exist.
    if (!targetUser) return message.reply(response.chooseMessageResponse(personality.command.removerole.nouser, message));
    // Check mentioned user permission.
    if (rolenUser.hasPermission(permissions.removerole)) return message.reply(response.chooseMessageResponse(personality.command.removerole.nopermission, message));

    // Delete your own command.
    await message.delete().catch(); 

    // Check for a specified role.
    let role = arguments.join('').slice(22);
    if (!role) return message.reply(response.chooseMessageResponse(personality.command.removerole.norole, message));

    // Check if the role exists.
    let guildRole = message.guild.roles.find(`name`, role); 
    if (!guildRole) return message.reply(response.chooseMessageResponse(personality.command.removerole.unfoundrole, message));

    // Check if the don't have the role.
    if (!targetUser.roles.has(guildRole.id)) return message.reply(response.chooseMessageResponse(personality.command.removerole.hasnotrole, message));

    // Remove the role from the user.
    await (targetUser.removeRole(guildRole.id)); 

    try {
        // Informe user directly over their guild role remove.
        await targetUser.send(response.chooseMessageResponse(personality.command.removerole.notify, message, guildRole.name));
    } catch(err) {
        console.log(`[error] ${roelUser.user.tag} couldn't be contacted because of this error: ${err}`);
    }
}

module.exports.config = {
    name: "removerole",
    aliases: [],
    usage: "<prefix>removerole <user> <role>",
    description: ""
}