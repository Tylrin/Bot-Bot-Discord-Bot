const Discord = require("discord.js");
const ms = require("ms");
const Permissions = require("../utilities/commandpermission.json");
const Color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.mute)) { // Check permission for the command.
        message.reply("You don't have the right to mute someone.")
        return;
    };
    let muteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); // Get mentioned user.
    if (!muteUser) { // Check if the user exist.
        message.reply("Couldn't find the user")
        return; 
    };
    if (muteUser.hasPermission(Permissions.mute)) { // Can the user be banned.
        message.reply(`${muteUser} can't be muted!`)
        return; 
    };
    await message.delete().catch(); // Delete your own command.

    let muteRole = message.guild.roles.find(`name`, 'muted');
    // Create mute role
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
        } catch(e) {
                console.log(e.stack);
        }
    }
    // Set mute time
    let muteTime = arguments[1];
    if (!muteTime) {
        message.reply("You didn't specify a time!");
        return;
    }

    await (muteUser.addRole(muteRole.id));
    message.reply(`<@${muteUser.id}> has been muted for ${ms(ms(muteTime))}`);

    // Remove mute role
    setTimeout(function() {
        muteUser.removeRole(muteRole.id);
        message.channel.send(`<@${muteUser.id}> has been unmuted!`);
    }, ms(muteTime));
}

module.exports.config = {
    name: "mute",
    aliases: []
}