const Discord = require("discord.js");
const ms = require("ms");
const permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.mute)) return message.reply("You don't have the right to mute someone.");

    // Get mentioned user.
    let muteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    // Check if the user exist.
    if (!muteUser) return message.reply("Couldn't find the user");
    // Check mentioned user permission.
    if (muteUser.hasPermission(permissions.mute)) return  message.reply(`${muteUser} can't be muted!`);

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
    if (!muteTime) return message.reply("You didn't specify a time!");

    // Add the role to the user.
    await (muteUser.addRole(muteRole.id));

    try {
        await muteUser.send(`You have been muted in ${message.guild.name} for ${ms(ms(muteTime))}`);
    } catch(err) {
        console.log(`${muteUser.user.tag} coudn't be DMed because of this error. ${err}`);
    }
}

module.exports.config = {
    name: "mute",
    aliases: ["silence"]
}