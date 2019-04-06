const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.eightball)) return message.reply("You don't have the right to ban someone.");
    // Delete your own command.
    await message.delete().catch();

    // Get the question.
    let question = arguments.slice(0).join(" ").trim();
    // Was a valid question asked.
    if (!question) return message.reply("Please ask a full question!");

    // Calculate replies.
    let replies = ["Yes.", "No.", "I don´t know.", "Ask again later."];
    let result = Math.floor((Math.random() * replies.length));

    // Create embed.
    let ballEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor(color.eightball)
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballEmbed);
}

module.exports.config = {
    name: "8ball",
    aliases: ["8"],
    usage: `!8ball <your question>`,
    description: ""
}