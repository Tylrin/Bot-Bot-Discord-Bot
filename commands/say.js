const Discord = require('discord.js');

module.exports.run = async (client, message, arguments) => {
    await message.delete(); // Delete the command
    if (message.member.hasPermission(['MANAGE_GUILD'])) {
      let botMessage = arguments.join(' ').trim();
      message.delete().catch();
      message.channel.send(botMessage);
    } else {
        message.reply('No!');
    }
}

module.exports.help = {
    name: 'say'
}