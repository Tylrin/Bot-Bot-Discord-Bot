const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const superagent = require("superagent");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.cat)) return message.reply("You don't have the right to post a cat image.");
        
    // Delete your own command.
    await message.delete().catch();

    // Send preperation message.
    let msg = await message.channel.send("Generating...");

    // Get image url.
    let {body} = await superagent
    .get("http://aws.random.cat/meow")

    // Check if body exist.
    if (!body) return msg.reply("Sorry no cat image, there seems to be a problem with my connection");

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