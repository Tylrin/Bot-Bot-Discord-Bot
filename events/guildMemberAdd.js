const Discord = require("discord.js");

module.exports = (client, member) => {
    // On member added
    console.log(`${member.id} joined the server`);
    let welcomeChannel = member.guild.channels.find(`name`, "welcome");
    if (!welcomeChannel) {
        message.channel.send("Couldn´t find welcome channel")
        return;
    }; 
    welcomeChannel.send(`Hey everyone! ${member} joined the channel`);
}