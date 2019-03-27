const Discord = require('discord.js');
const Permissions = require('../utilities/commandpermission.json')

module.exports.run = async (client, message, arguments) => {
    if (message.member.hasPermission(Permissions.banPermission)) {
        await message.delete(); // Delete the command
        let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
        if (!banUser) return message.channel.send('Couldn`t find user');
        let reason = arguments.join(' ').slice(22).trim();
        if (banUser.hasPermission(Permissions.banPermission)) return message.channel.send(`${banUser} can´t be banned!`)

        let banEmbed = new Discord.RichEmbed() // Prepare embed
        .setDescription('Ban')
        .setColor('#141619')
        .addField('Banned User', `${banUser} with ID ${banUser.id}`)
        .addField('Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
        .addField('Channel', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reasons', (!!reason ? reason : 'No reason named.'));

        let banChannel = message.guild.channels.find(`name`, 'incidents');
        if (!banChannel) return message.channel.send('Couldn´t find incidents channel');

        /* message.guild.member(banUser).ban(reason); */
        banChannel.send(banEmbed).catch();
    } else {
        message.channel.send('No can do pal!');
    }
}

module.exports.help = {
    name: 'ban'
}