const Discord = require("discord.js");
const Permissions = require("../utilities/commandpermission.json");
const Color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.ping)) { // Check permission for the command.
        message.reply("You don't have the right to test the ping.")
        return;
    };

    message.channel.send("Pinging...").then(msg => {
        let ping = msg.createdTimestamp - message.createdTimestamp;
        let choices = ["Is it really my ping?", "Is it okay? I can't look!", "I hope it isn't bad!"];
        let response = choices[Math.floor(Math.random() * choices.length)];

        msg.edit(response);

        let pingEmbed = new Discord.RichEmbed()
        .setDescription("Lateny")
        .setColor(Color.ping)
        .addField("Bot Latency", ping)
        .addField("API Lateny", Math.round(client.ping));

        message.channel.send(pingEmbed);
    });
}

module.exports.config = {
    name: "ping",
    aliases: ["latency"]
}