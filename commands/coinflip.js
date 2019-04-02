const Discord = require("discord.js");
const Permissions = require("../utilities/commandpermission.json");
const Color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.coinflip)) { // Check permission for the command.
        message.reply("You don't have the right to flip a coin.")
        return;
    };
    await message.delete().catch(); // Delete your own command.

    let replies = ["head", "tails"];
    let result = Math.floor((Math.random() * replies.length));

    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor(Color.coinflip)
    .addField("Coin Face", replies[result]);

    message.channel.send(coinEmbed);
}

module.exports.config = {
    name: "coinflip",
    aliases: []
}