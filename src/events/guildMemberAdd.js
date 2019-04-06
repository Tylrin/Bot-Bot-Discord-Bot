module.exports = (client, member) => {
    // On member added
    console.log(`${member.id} joined the server`);

    // Get channel location
    let welcomeChannel = member.guild.channels.find("name", "welcome");
    // Checking if the channel exist
    if (!welcomeChannel) return message.channel.send("Couldn´t find welcome channel");
    // Send welcome message
    welcomeChannel.send(`Hey everyone! ${member} joined the channel`);
}