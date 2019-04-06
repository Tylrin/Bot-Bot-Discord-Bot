const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.coinflip)) return message.reply("You don't have the right to flip a coin.")

    // Delete your own command.
    await message.delete().catch();

    // Calculate replies.
    let replies = ["head", "tails"];
    let result = Math.floor((Math.random() * replies.length));

    // Create embed.
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor(color.coinflip)
    .addField("Coin Face", replies[result]);

    message.channel.send(coinEmbed);
}

module.exports.config = {
    name: "coinflip",
    aliases: []
}