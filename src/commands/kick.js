const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.kick)) return message.reply(response.chooseMessageResponse(personality.command.kick.permission, message));

    // Get mentioned user.
    let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    // Check if the user exist.
    if (!kickUser) return message.reply(response.chooseMessageResponse(personality.command.kick.nouser, message));
    // Check mentioned user permission.
    if (kickUser.hasPermission(permissions.kick)) return message.reply(response.chooseMessageResponse(personality.command.kick.nopermission, message));
    // Is the client able to kick someone.
    if (!kickUser.kickable()) return message.reply(response.chooseMessageResponse(personality.command.kick.unkickable, message));

    // Delete your own command.
    await message.delete().catch();

    // Get kick reason.
    let reason = arguments.join(" ").slice(22).trim();

    //Create embed.
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor(color.kick)
    .addField("Kick User", `${kickUser} with ID ${kickUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reasons", reason);
    
    // Get channel location.
    let kickChannel = message.guild.channels.find(`name`, 'incidents');
    // Does the channel exist.
    if (!kickChannel) return  message.channel.send(response.chooseMessageResponse(personality.command.kick.nochannel, message));
    
    // Kick user and send embed.
    message.guild.member(kickUser).kick(reason);
    kickChannel.send(kickEmbed);

    try {
        // Informe user directly over their guild kick.
        await kickUser.send(response.chooseMessageResponse(personality.command.kick.notify, message, reason));
    } catch(err) {
        console.log(`[error] ${kickUser.user.tag} couldn't be contacted because of this error: ${err}`);
    }
}

module.exports.config = {
    name: "kick",
    aliases: [],
    usage: "<prefix>kick <user> <reason>",
    description: ""
}