const Discord = require('discord.js');
const Permissions = require('../utilities/commandpermission.json');
const Color = require('../utilities/commandcolor.json');

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.banPermission)) { // Check permission for the command.
        message.reply("You don't have the right to ban someone.")
        return;
    };
    let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); // Get mentioned user.
    if (!banUser) { // Check if the user exist.
        message.reply("Couldn't find the user")
        return; 
    };
    if (banUser.hasPermission(Permissions.banPermission)) { // Can the user be banned.
        message.reply(`${banUser} can't be banned!`)
        return; 
    };
    if (!banUser.bannable()) { // Is the client able to ban someone.
        message.reply(`I am unable to ban ${banUser}.`)
        return;
    };
    await message.delete().catch(); // Delete your own command

    let reason = arguments.join(' ').slice(22).trim();
    let banEmbed = new Discord.RichEmbed()
    .setDescription('Ban')
    .setColor(Color.banColor)
    .addField('Banned User', `${banUser} with ID ${banUser.id}`)
    .addField('Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
    .addField('Channel', message.channel)
    .addField('Time', message.createdAt)
    .addField('Reasons', (!!reason ? reason : 'No reason named.'));

    let banChannel = message.guild.channels.find(`name`, 'incidents');
    if (!banChannel) {
        message.channel.send('Couldn´t find incidents channel')
        return;
    }; 

    message.guild.member(banUser).ban(reason);
    banChannel.send(banEmbed).catch();

    try {
        await banUser.send(`You got banned from ${message.guild.name} because: ${reason}`);
    } catch(err) {
        console.log(`${banUser} coudn't be DMed because of this error. ${err}`);
    }
}

module.exports.help = {
    name: 'ban'
}