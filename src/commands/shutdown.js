const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.shutdown))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.shutdown.permission,
				message,
				arguments
			)
		);

	// Delete your own command.
	await message.delete().catch();

	try {
		await message.channel.send(
			response.command.chooseMessageResponse(
				personality.command.shutdown.notify,
				message,
				arguments
			)
		);
		process.exit();
	} catch (err) {
		console.log(err);
		message.channel.send(`[error] ${err.message}`);
	}
};

module.exports.config = {
	name: "shutdown",
	aliases: ["q", "quit", "exit"],
	usage: "<prefix>shutdown",
	description: ""
};
