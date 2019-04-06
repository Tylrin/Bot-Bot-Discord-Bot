const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.ban)) return message.reply("You don't have the right to ban someone.");

    // Get mentioned user.
    let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); 
    // Check if the user exist.
    if (!banUser) return message.reply("Couldn't find the user");
    // Check mentioned user permission.
    if (banUser.hasPermission(permissions.ban)) return message.reply(`${banUser} can't be banned!`);
    // Is the client able to ban someone.
    if (!banUser.bannable()) return message.reply(`I am unable to ban ${banUser}.`);

    // Delete your own command.
    await message.delete().catch();

    // Get ban reason.
    let reason = arguments.join(" ").slice(22).trim();

    // Create embed.
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor(color.ban)
    .addField("Banned User", `${banUser} with ID ${banUser.id}`)
    //.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reasons", (!!reason ? reason : "No reason named."));

    // Get channel location.
    let banChannel = message.guild.channels.find(`name`, 'incidents');
    // Does the channel exist.
    if (!banChannel) return message.channel.send("Couldn't find incidents channel");

    // Ban user and send embed.
    message.guild.ban(banUser, { day: 1, reason: reason}).catch(err => console.log(err));
    banChannel.send(banEmbed).catch();

    try {
        // Informe user directly over their guild ban.
        await banUser.send(`You got banned from ${message.guild.name} because: ${reason}`);
    } catch(err) {
        console.log(`${banUser.user.tag} couldn't be contacted because of this error: ${err}`);
    }
}

module.exports.config = {
    name: "ban",
    aliases: ["b", "banish", "remove"],
    usage: "",
    description: ""
}