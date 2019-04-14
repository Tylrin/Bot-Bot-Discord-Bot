const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const superagent = require("superagent");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.badmeme)) return message.reply(response.command.chooseMessageResponse(personality.command.badmeme.permission, message));
    
    // Delete your own command.
    await message.delete().catch();
    
    // Send preperation message.
    let msg = await message.channel.send(response.command.chooseMessageResponse(personality.command.badmeme.load, message));

    // Get data url.
    let {body} = await superagent
    .get("https://api-to.get-a.life/meme")

    // Check if body exist.
    if (!body) return msg.reply(response.command.chooseMessageResponse(personality.command.badmeme.errorload, message));

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