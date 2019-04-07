const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(permissions.report)) { // Check permission for the command.
        message.reply("You don't have the right to report someone.")
        return;
    };
    let reportUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); // Get mentioned user.
    if (!reportUser) { // Check if the user exist.
        message.reply("Couldn't find the user")
        return; 
    };
    if (reportUser.hasPermission(permissions.report)) { // Can the user be banned.
        message.reply(`${reportUser} can't be reported!`)
        return; 
    };
    await message.delete().catch(); // Delete your own command
    
    let reason = arguments.join(' ').slice(22).trim();

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor(color.report)
    .addField("Reported User", `${reportUser} with ID: ${reportUser.id}`)
    //.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reasons", reason);
    
    let reportsChannel = message.guild.channels.find(`name`, 'reports')
    if (!reportsChannel) {
        message.channel.send("Couldn't find reports channel")
        return;
    }
    reportsChannel.send(reportEmbed);
}

module.exports.config = {
    name: "report",
    aliases: [],
    usage: "<prefix>report <user>",
    description: ""
}