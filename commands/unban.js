const Discord = require('discord.js');
const Permissions = require('../utilities/commandpermission.json');
const Color = require('../utilities/commandcolor.json');

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.unbanPermission)) { // Check permission for the command.
        message.reply("You don't have the right to ban someone.")
        return;
    };
    let unbanUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); // Get mentioned user.
    if (!unbannUser) { // Check if the user exist.
        message.reply("Couldn't find the user")
        return; 
    };
    if (unbanUser.hasPermission(Permissions.unbanPermission)) { // Can the user be banned.
        message.reply(`${unbanUser} can't be banned!`)
        return; 
    };
    await message.delete().catch(); // Delete your own command

    let reason = arguments.join(' ').slice(22).trim();
    let unbanEmbed = new Discord.RichEmbed()
    .setDescription('Ban')
    .setColor(Color.banColor)
    .addField('Banned User', `${unbanUser} with ID ${unbanUser.id}`)
    .addField('Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
    .addField('Channel', message.channel)
    .addField('Time', message.createdAt)
    .addField('Reasons', (!!reason ? reason : 'No reason named.'));

    let unbanChannel = message.guild.channels.find(`name`, 'incidents');
    if (!unbanChannel) return message.channel.send('Couldn´t find incidents channel');

    message.guild.member(unbanUser).unban(reason);
    unbanChannel.send(unbanEmbed).catch();

    try {
        await banUser.send(`You got because: ${reason}`);
    } catch(err) {
        console.log(`${unbanUser} coudn't be DMed because of this error. ${err}`);
    }

}

module.exports.help = {
    name: 'unban'
}