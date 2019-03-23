const Discord = require('discord.js');

module.exports.run = async (client, message, arguments) => {
    await message.delete(); // Delete the command
    let serverIcon = message.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
    .setDescription('Server Information')
    .setColor('#141619')
    .setThumbnail(serverIcon)
    .addField('Server Name', message.guild.name)
    .addField('Created On', message.guild.createdAt)
    .addField('You Joined', message.member.joinedAt)
    .addField('Total Members', message.guild.memberCount);

    message.channel.send(serverEmbed); // Send the Embed
}

module.exports.help = {
    name: 'serverinfo'
}