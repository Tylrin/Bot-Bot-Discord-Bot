const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const superagent = require("superagent");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.chucknorris)) return message.reply(response.chooseMessageResponse((personality.command.chucknorris.permission), message));
        
    // Delete your own command.
    await message.delete().catch();

    // Send preperation message.
    let msg = await message.channel.send(response.chooseMessageResponse((personality.command.chucknorris.load), message));

    // Get data url.
    let {body} = await superagent
    .get("https://api.chucknorris.io/jokes/random")

    // Check if body exist.
    if (!body) return msg.reply(response.chooseMessageResponse((personality.command.chucknorris.errorload), message));

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