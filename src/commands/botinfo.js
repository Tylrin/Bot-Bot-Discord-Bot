const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.botinfo)) return message.reply("You don't have the right to see the bot information.");

    // Delete your own command.
    await message.delete().catch();
    
    // Create embed.
    let botIcon = client.user.displayAvatarURL;
    let botEmbed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor(color.botinfo)
    .setThumbnail(botIcon)
    .addField("Bot Name", client.user.username)
    .addField("Created On", client.user.createdAt)
    .setTimestamp();

    message.author.send(botEmbed);
}

module.exports.config = {
    name: "botinfo",
    aliases: ["bi", "bot"," botdescription"],
    usage: "<prefix>botinfo",
    description: ""
}