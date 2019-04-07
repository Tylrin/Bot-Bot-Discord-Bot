const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const superagent = require("superagent");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.badmeme)) return message.reply("You don't have the right to post a meme.");
        
    // Delete your own command.
    await message.delete().catch();
    
    // Send preperation message.
    let msg = await message.channel.send("Generating...");

    // Get data url.
    let {body} = await superagent
    .get("https://api-to.get-a.life/meme")

    // Check if body exist.
    if (!body) return msg.reply("Sorry no meme, there seems to be a problem with my connection");

    // Create embed.
    let memeEmbed = new Discord.RichEmbed()
    //.setTitle(body.text)
    .setColor(color.badmeme)
    .setImage(body.url)
    .setFooter("Meme", client.user.avatarURL);
    
    msg.edit(memeEmbed);  
}

module.exports.config = {
    name: "badmeme",
    aliases: [],
    usage: "<prefix>badmeme",
    description: ""
}