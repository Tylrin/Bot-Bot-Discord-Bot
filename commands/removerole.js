const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.removerole)) return message.reply("You don't have the right to remove someones role.");

    // Get mentioned user.
    let roleUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); 
    // Check if the user exist.
    if (!roleUser) return message.reply("Couldn't find the user");
    // Check mentioned user permission.
    if (rolenUser.hasPermission(permissions.removerole)) return message.reply(`You can remove a role from ${roleUser}.`);

    // Delete your own command.
    await message.delete().catch(); 

    // Check for a specified role.
    let role = arguments.join('').slice(22);
    if (!role) return message.reply("Specify a role!");

    // Check if the role exists.
    let guildRole = message.guild.roles.find(`name`, role); 
    if (!guildRole) return message.reply("Cound't find that role");

    // Check if the don't have the role.
    if (!roleUser.roles.has(guildRole.id)) return message.reply("They don't have that role.")

    // Remove the role from the user.
    await (roleUser.removeRole(guildRole.id)); 

    try {
        // Informe user directly over their guild role remove.
        await roleUser.send(`You lost the role ${guildRole.name} on the server ${message.guild.name}`);
    } catch(err) {
        console.log(`${roelUser.user.tag} couldn't be contacted because of this error: ${err}`);
    }
}

module.exports.config = {
    name: "removerole",
    aliases: []
}