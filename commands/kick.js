const Discord = require('discord.js');

module.exports.run = async (client, message, arguments) => {
    await message.delete(); // Delete the command
    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
        let kickUser = message.guild.member(message.mentions.first() || message.guild.members.get(arguments[0]));
        if (!kickUser) return message.channel.send('Couldn`t find user');
        let reason = arguments.join(' ').slice(22).trim();
        if (kickUser.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) return message.channel.send(`${kickUser} can´t be kicked!`)
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription('Kick')
        .setColor('#141619')
        .addField('Kick User', `${kickUser} with ID ${kickUser.id}`)
        .addField('Kicked By', `<@${message.author.id}> with ID ${message.author.id}`)
        .addField('Channel', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reasons', reason);
    
        let kickChannel = message.guild.channels.find(`name`, 'incidents')
        if (!kickChannel) return message.channel.send('Couldn´t find incidents channel');
    
        message.guild.member(kickUser).kick(reason);
        message.delete().catch(O_o=>{});
        kickChannel.send(kickEmbed);
    } else {
        message.channel.send('No can do pal!')
    }
}

module.exports.help = {
    name: 'kick'
}