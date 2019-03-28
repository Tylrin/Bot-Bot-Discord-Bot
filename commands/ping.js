const Discord = require('discord.js');
const Permissions = require('../utilities/commandpermission.json');

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.pingPermission)) { // Check permission for the command.
        message.reply("You don't have the right to play ping.")
        return;
    };
    message.channel.send('Pong!')
}

module.exports.help = {
    name: 'ping'
}