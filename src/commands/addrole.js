const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.addrole)) return message.reply(response.command.chooseMessageResponse(personality.command.addrole.permission, message));

    // Get mentioned user.
    let targetUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    // Check if the user exist.
    if (!targetUser) return message.reply(response.command.chooseMessageResponse(personality.command.addrole.nouser, message));
    // Check mentioned user permission.
    if (rolenUser.hasPermission(permissions.addrole)) return message.reply(response.command.chooseMessageResponse(personality.command.addrole.nopermission, message));

    // Delete your own command.
    await message.delete().catch();
    
     // Get the specified role.
    let role = arguments.join(" ").slice(22);
    if (!role) return message.reply(response.command.chooseMessageResponse(personality.command.addrole.norole, message));

    // Check if the role exists.
    let guildRole = message.guild.roles.find(`name`, role); 
    if (!guildRole) return message.reply(response.command.chooseMessageResponse(personality.command.addrole.unfoundrole, message));
    
    // Check if the user has the role already.
    if (!targetUser.roles.has(guildRole.id)) return message.reply(response.command.chooseMessageResponse(personality.command.addrole.hasrole, message, guildRole.name));
    // Add the role to the user.
    await (targetUser.addRole(guildRole.id));

    try {
        // Informe user directly over the added role.   guildRole.name
        await targetUser.send(response.command.chooseMessageResponse(personality.command.addrole.notify, message, guildRole.name));
    } catch(err) {
        console.log(`[error] The user ${targetUser.user.tag} couldn't be contacted because of this error: ${err}`);
    }
}

module.exports.config = {
    name: "addrole",
    aliases: [],
    usage: "<prefix>addrole <user> <role>",
    description: ""
}