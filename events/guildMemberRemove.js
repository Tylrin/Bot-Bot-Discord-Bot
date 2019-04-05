const Discord = require("discord.js");

module.exports = (client, member) => {
    // On member removed
    console.log(`${member.id} left the server`);
    let welcomeChannel = member.guild.channels.find(`name`, "welcome");
    if (!welcomeChannel) {
        message.channel.send("Couldn´t find welcome channel")
        return;
    }; 
    welcomeChannel.send(`Hey everyone! ${member} left the channel`);
}