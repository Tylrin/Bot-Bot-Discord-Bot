const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.addrole)) return message.reply("You don't have the right to add a role to someone.");

    // Get mentioned user.
    let roleUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    // Check if the user exist.
    if (!roleUser) return message.reply("Couldn't find the user");
    // Check mentioned user permission.
    if (rolenUser.hasPermission(permissions.addrole)) return message.reply(`You can add a role to ${roleUser}.`);

    // Delete your own command.
    await message.delete().catch();
    
     // Get the specified role.
    let role = arguments.join(" ").slice(22);
    if (!role) return message.reply("Specify a role!");

    // Check if the role exists.
    let guildRole = message.guild.roles.find(`name`, role); 
    if (!guildRole) return message.reply("Cound't find that role");
    
    // Check if the user has the role already.
    if (!roleUser.roles.has(guildRole.id)) return message.reply("They already have that role.");
    // Add the role to the user.
    await (roleUser.addRole(guildRole.id));

    try {
        // Informe user directly over the added role.
        await roleUser.send(`You got the role ${guildRole.name} on the server ${message.guild.name}`);
    } catch(err) {
        console.log(`The user ${roleUser.user.tag} couldn't be contacted because of this error: ${err}`);
    }
}

module.exports.config = {
    name: "addrole",
    aliases: [],
    usage: "<prefix>addrole <user> <role>",
    description: ""
}