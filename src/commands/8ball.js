const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.eightball)) return message.reply("You don't have the right to play 8ball.");
    // Delete your own command.
    await message.delete().catch();

    // Get the question.
    let question = arguments.slice(0).join(" ").trim();
    // Was a valid question asked.
    if (!question) return message.reply(response.chooseVoiceline((personality.command.eightball.noquestion), message));

    // Calculate replies.
    let replies =  response.chooseVoiceline(personality.command.eightball.replies, message, question);

    // Create embed.
    let ballEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor(color.eightball)
    .addField("Question", question)
    .addField("Answer", replies);

    message.channel.send(ballEmbed);
}

module.exports.config = {
    name: "8ball",
    aliases: ["8"],
    usage: `<prefix>8ball <your question>`,
    description: ""
}