const Discord = require('discord.js');
const Permissions = require('../utilities/commandpermission.json');
const Color = require('../utilities/commandcolor.json');

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.serverinfoPermission)) { // Check permission for the command.
        message.reply("You don't have the right to see the server information.")
        return;
    };
    await message.delete().catch(); // Delete your own command.

    let serverIcon = message.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
    .setDescription('Server Information')
    .setColor(Color.serverinfoColor)
    .setThumbnail(serverIcon)
    .addField('Server Name', message.guild.name)
    .addField('Created On', message.guild.createdAt)
    .addField('You Joined', message.member.joinedAt)
    .addField('Total Members', message.guild.memberCount);

    message.author.send(serverEmbed);
};

module.exports.help = {
    name: 'serverinfo'
};