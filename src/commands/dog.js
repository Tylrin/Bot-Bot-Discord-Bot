const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const superagent = require("superagent");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.dog)) return message.reply("You don't have the right to post a dog image.");
        
    // Delete your own command.
    await message.delete().catch();

    // Send preperation message.
    let msg = await message.channel.send("Generating...");

    // Get image url.
    let {body} = await superagent
    .get("https://random.dog/woof.json")

    // Check if body exist.
    if (!body) return msg.reply("Sorry no dog image, there seems to be a problem with my connection");

    // Create embed.
    let dogEmbed = new Discord.RichEmbed()
    .setTitle("Doggo :dog:")
    .setColor(color.dog)
    .setImage(body.url);
    
    msg.edit(dogEmbed);  
}

module.exports.config = {
    name: "dog",
    aliases: [],
    usage: "<prefix>dog",
    description: ""
}