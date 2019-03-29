const Discord = require('discord.js');
const Permissions = require('../utilities/commandpermission.json');

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.sayPermission)) { // Check permission for the command.
        message.reply("You can't use the !say command.")
        return;
    };
    await message.delete().catch(); // Delete your own command.

    let botMessage = arguments.join(' ').trim();
    message.channel.send(botMessage);
};

module.exports.help = {
    name: 'say'
};