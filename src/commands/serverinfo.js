const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.serverinfo)) return message.reply("You don't have the right to see the server information.");

    // Delete your own command.
    await message.delete().catch();

    // Create embed.
    let serverIcon = message.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor(color.serverinfo)
    .setThumbnail(serverIcon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    message.author.send(serverEmbed);
};

module.exports.config = {
    name: "serverinfo",
    aliases: ["si", "server", "serverdescription"],
    usage: "<prefix>serverinfo",
    description: ""
};