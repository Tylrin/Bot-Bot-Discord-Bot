const Discord = require("discord.js");
const Permissions = require("../utilities/commandpermission.json");
const Color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.eightball)) { // Check permission for the command.
        message.reply("You don't have the right to ban someone.")
        return;
    };
    await message.delete().catch(); // Delete your own command.

    if (!arguments[2]) {
        message.reply("Please ask a full question!");
        return;
    };
    let replies = ["Yes.", "No.", "I don´t know.", "Ask again later."];
    let result = Math.floor((Math.random() * replies.length));
    let question = arguments.slice(0).join(" ").trim();

    let ballEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor(Color.eightball)
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballEmbed);
}

module.exports.config = {
    name: "8ball",
    aliases: ["8"]
}