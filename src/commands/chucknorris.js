const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const superagent = require("superagent");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.chucknorris)) return message.reply("You don't have the right to post a cat image.");
        
    // Delete your own command.
    await message.delete().catch();

    // Send preperation message.
    let msg = await message.channel.send("Generating...");

    // Get data url.
    let {body} = await superagent
    .get("https://api.chucknorris.io/jokes/random")

    // Check if body exist.
    if (!body) return msg.reply("Sorry no Chucknorris jokes, there seems to be a problem with my connection");

    // Create embed.
    let chuckEmbed = new Discord.RichEmbed()
    .setTitle("Chuck Norris Joke")
    .setDescription(body.value)
    .setColor(color.cat);
    
    msg.edit(chuckEmbed);
}

module.exports.config = {
    name: "chucknorris",
    aliases: ["chuck"],
    usage: "<prefix>chucknorris",
    description: ""
}