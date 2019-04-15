const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.dice))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.dice.permission,
				message,
				arguments
			)
		);

	// Delete your own command.
	await message.delete().catch();

	// Calculate response.
	let diceNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	message.channel.send(
		response.command.chooseMessageResponse(
			personality.command.dice.replies,
			message,
			arguments,
			diceNumber
		)
	);
};

module.exports.config = {
	name: "dice",
	aliases: [],
	usage: "<prefix>dice",
	description: ""
};
