const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const superagent = require("superagent");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.cat)) return message.reply(response.command.chooseMessageResponse((personality.command.cat.permission), message));
        
    // Delete your own command.
    await message.delete().catch();

    // Send preperation message.
    let msg = await message.channel.send(response.command.chooseMessageResponse((personality.command.cat.load), message));

    // Get data url.
    let {body} = await superagent
    .get("http://aws.random.cat/meow")

    // Check if body exist.
    if (!body) return msg.reply(response.command.chooseMessageResponse((personality.command.cat.errorload), message));

    // Create embed.
    let catEmbed = new Discord.RichEmbed()
    .setTitle("Cat :cat:")
    .setColor(color.cat)
    .setImage(body.file)
    
    msg.edit(catEmbed);
}

module.exports.config = {
    name: "cat",
    aliases: [],
    usage: "<prefix>cat",
    description: ""
}