const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.unban)) return message.reply("You don't have the right to unban someone.");

    // Get mentioned user.
    let unbanUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    // Check if the user exist.
    if (!unbannUser) return message.reply("Couldn't find the user");

    // Can the user be unbanned.
    if (unbanUser.hasPermission(permissions.unban)) return message.reply(`${unbanUser} can't be unbanned!`);

    // Delete your own command.
    await message.delete().catch(); 

    // Create embed.
    let reason = arguments.join(' ').slice(22).trim();
    let unbanEmbed = new Discord.RichEmbed()
    .setDescription("Unban")
    .setColor(color.ban)
    .addField("Unbanned User", `${unbanUser} with ID ${unbanUser.id}`)
    .addField("Unbanned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reasons", (!!reason ? reason : 'No reason named.'));

    // Get channel location.
    let unbanChannel = message.guild.channels.find(`name`, 'incidents');
    // Does the channel exist.
    if (!unbanChannel) return message.channel.send("Couldn't find incidents channel");

    // Unban user and send embed.
    message.guild.member(unbanUser).unban(reason);
    unbanChannel.send(unbanEmbed).catch();

    try {
         // Informe user directly over their guild unban.
        await banUser.send(`You got unbanned from ${message.channel} because: ${reason}`);
    } catch(err) {
        console.log(`${unbanUser.user.tag} couldn't be contacted because of this error: ${err}`);
    }
}

module.exports.config = {
    name: "unban",
    aliases: []
}