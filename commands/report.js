const Discord = require('discord.js');

module.exports.run = async (client, message, arguments) => {
    await message.delete(); // Delete the command
    if (message.member.hasPermission(['MANAGE_MESSAGES'])) {
        let reportUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
        if (!reportUser) return message.channel.send('Couldn`t find user');
        let reason = arguments.join(' ').slice(22).trim();

        let reportEmbed = new Discord.RichEmbed()
        .setDescription('Reports')
        .setColor('#141619')
        .addField('Reported User', `${reportUser} with ID: ${reportUser.id}`)
        .addField('Reported By', `${message.author} with ID: ${message.author.id}`)
        .addField('Channel', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reasons', reason);
    
        let reportsChannel = message.guild.channels.find(`name`, 'reports')
        if (!reportsChannel) return message.channel.send('Couldn´t find reports channel');

        message.delete().catch(O_o=>{});
        reportsChannel.send(reportEmbed);
    } else {
        message.channel.send("you don't seem to have the permissions to do that")
    }
}

module.exports.help = {
    name: 'report'
}