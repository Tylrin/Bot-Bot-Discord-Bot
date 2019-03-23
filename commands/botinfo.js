const Discord = require('discord.js');

module.exports.run = async (client, message, arguments) => {
    await message.delete(); // Delete the command
    
    let botIcon = client.user.displayAvatarURL;
    let botEmbed = new Discord.RichEmbed()
    .setDescription('Bot Information')
    .setColor('#141619')
    .setThumbnail(botIcon)
    .addField('Bot Name', client.user.username)
    .addField('Created On', client.user.createdAt);

    message.channel.send(botEmbed); // Send the Embed
}

module.exports.help = {
    name: 'botinfo'
}