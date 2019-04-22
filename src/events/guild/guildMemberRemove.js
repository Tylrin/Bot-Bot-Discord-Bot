module.exports = (client, member) => {
	// On member removed or kicked
	console.log(`${member.id} left the server`);

	// Get channel location
	let welcomeChannel = member.guild.channels.find("name", "welcome");
	// Checking if the channel exist
	if (!welcomeChannel) return message.channel.send("Couldn´t find welcome channel");
	// Send welcome message
	welcomeChannel.send(`Hey everyone! ${member} left the channel`);
};
