const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.ban)) return message.reply(response.command.chooseMessageResponse(personality.command.ban.permission, message));

    // Get mentioned user.
    let targetUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); 
    // Check if the user exist.
    if (!targetUser) return message.reply(response.command.chooseMessageResponse(personality.command.ban.nouser, message));
    // Check mentioned user permission.
    if (targetUser.hasPermission(permissions.ban)) return message.reply(response.command.chooseMessageResponse(personality.command.ban.nopermission, message));
    // Is the client able to ban someone.
    if (!targetUser.bannable()) return message.reply(response.command.chooseMessageResponse(personality.command.ban.unbannable, message));

    // Delete your own command.
    await message.delete().catch();

    // Get ban reason.
    let reason = arguments.join(" ").slice(22).trim();

    // Create embed.
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor(color.ban)
    .addField("Banned User", `${targetUser} with ID ${targetUser.id}`)
    //.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reasons", (!!reason ? reason : "No reason named."));

    // Get channel location.
    let banChannel = message.guild.channels.find(`name`, 'incidents');
    // Does the channel exist.
    if (!banChannel) return message.channel.send(response.command.chooseMessageResponse(personality.command.ban.nochannel, message));

    // Ban user and send embed.
    message.guild.ban(targetUser, { day: 1, reason: reason}).catch(err => console.log(err));
    banChannel.send(banEmbed).catch();

    try {
        // Informe user directly over their guild ban.
        await targetUser.send(response.command.chooseMessageResponse(personality.command.ban.notify, message));
    } catch(err) {
        console.log(`[error] ${targetUser.user.tag} couldn't be contacted because of this error: ${err}`);
    }
}

module.exports.config = {
    name: "ban",
    aliases: ["b", "banish", "remove"],
    usage: "<prefix>ban <user>",
    description: ""
}