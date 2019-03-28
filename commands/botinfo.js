const Discord = require('discord.js');
const Permissions = require('../utilities/commandpermission.json');
const Color = require('../utilities/commandcolor.json');

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.botinfoPermission)) { // Check permission for the command.
        message.reply("You don't have the right to see the bot information.")
        return;
    };
    await message.delete().catch(); // Delete your own command.
    
    let botIcon = client.user.displayAvatarURL;
    let botEmbed = new Discord.RichEmbed()
    .setDescription('Bot Information')
    .setColor(Color.botinfoColor)
    .setThumbnail(botIcon)
    .addField('Bot Name', client.user.username)
    .addField('Created On', client.user.createdAt);

    message.author.send(botEmbed);
}

module.exports.help = {
    name: 'botinfo'
}