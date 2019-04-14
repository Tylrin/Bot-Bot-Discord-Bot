const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.say))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.say.permission,
				message
			)
		);

	// Delete your own command.
	await message.delete().catch();

	// Get message.
	let botMessage = arguments.join(" ").trim();

	// Send message.
	message.channel.send(botMessage);
};

module.exports.config = {
	name: "say",
	aliases: ["s"],
	usage: "<prefix>say <message>",
	description: ""
};
