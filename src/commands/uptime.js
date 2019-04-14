const Discord = require("discord.js");
const Permissions = require("../utilities/commandpermission.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(Permissions.uptime))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.uptime.permission,
				message
			)
		);

	// Calculate time as string.
	function duration(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString();
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();
		const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
		const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
		return `${day.padStart(1, "0")} days, ${hrs.padStart(
			2,
			"0"
		)} hours, ${min.padStart(2, "0")} minutes, ${sec.padStart(
			2,
			"0"
		)} seconds`;
	}

	message.channel.send(
		response.command.chooseMessageResponse(
			personality.command.uptime.notify,
			message,
			duration(client.uptime)
		)
	);
};

module.exports.config = {
	name: "uptime",
	aliases: [],
	usage: "<prefix>uptime",
	description: ""
};
