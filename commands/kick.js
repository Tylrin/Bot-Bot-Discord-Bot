const Discord = require("discord.js");
const Permissions = require("../utilities/commandpermission.json");
const Color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.kick)) { // Check permission for the command.
        message.reply("You don't have the right to kick someone.")
        return;
    };
    let kicknUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); // Get mentioned user.
    if (!kickUser) { // Check if the user exist.
        message.reply("Couldn't find the user.")
        return; 
    };
    if (kickUser.hasPermission(Permissions.kick)) { // Can the user be kicked.
        message.reply(`${kickUser} can't be kicked!`)
        return; 
    };
    if (!kickUser.kickable()) { // Is the client able to kick someone.
        message.reply(`I am unable to kick ${kickUser}.`)
        return;
    };
    await message.delete().catch(); // Delete your own command.

    let reason = arguments.join(" ").slice(22).trim();
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor(Color.kick)
    .addField("Kick User", `${kickUser} with ID ${kickUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reasons", reason);
    
    let kickChannel = message.guild.channels.find(`name`, 'incidents');
    if (!kickChannel) {
        message.channel.send("Couldn't find incidents channel")
        return;
    };
    
    message.guild.member(kickUser).kick(reason);
    kickChannel.send(kickEmbed);

    try {
        await kickUser.send(`You got kicked from ${message.guild.name} because: ${reason}`);
    } catch(err) {
        console.log(`${kickUser} coudn't be DMed because of this error. ${err}`);
    }
}

module.exports.config = {
    name: "kick",
    aliases: []
}