const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.unban)) return message.reply(response.command.chooseMessageResponse(personality.command.unban.permission, message));

    // Get mentioned user.
    let targetUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    // Check if the user exist.
    if (!unbannUser) return message.reply(response.command.chooseMessageResponse(personality.command.unban.nouser, message));

    // Can the user be unbanned.
    if (targetUser.hasPermission(permissions.unban)) return message.reply(response.command.chooseMessageResponse(personality.command.unban.nopermission, message));

    // Delete your own command.
    await message.delete().catch(); 

    // Create embed.
    let reason = arguments.join(' ').slice(22).trim();
    let unbanEmbed = new Discord.RichEmbed()
    .setDescription("Unban")
    .setColor(color.ban)
    .addField("Unbanned User", `${targetUser} with ID ${targetUser.id}`)
    .addField("Unbanned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reasons", (!!reason ? reason : 'No reason named.'));

    // Get channel location.
    let unbanChannel = message.guild.channels.find(`name`, 'incidents');
    // Does the channel exist.
    if (!unbanChannel) return message.channel.send(response.command.chooseMessageResponse(personality.command.unban.nochannel, message));

    // Unban user and send embed.
    message.guild.member(targetUser).unban(reason);
    unbanChannel.send(unbanEmbed).catch();

    try {
         // Informe user directly over their guild unban.
        await banUser.send(response.command.chooseMessageResponse(personality.command.unban.notify, message, reason));
    } catch(err) {
        console.log(`[error] ${targetUser.user.tag} couldn't be contacted because of this error: ${err}`);
    }
}

module.exports.config = {
    name: "unban",
    aliases: [],
    usage: "<prefix>unban <user>",
    description: ""
}