const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.geocode))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.geocode.permission,
				message,
				arguments
			)
		);

	// Delete your own command.
	await message.delete().catch();

	// Send preperation message.
	let msg = await message.channel.send(
		response.command.chooseMessageResponse(
			personality.command.forecast.load,
			message,
			arguments
		)
	);

	// Create embed.
	let catEmbed = new Discord.RichEmbed()
		.setTitle()
		.setColor()
		.setImage();

	msg.edit(catEmbed);
};

module.exports.config = {
	name: "geocode",
	aliases: ["location", "gc"],
	usage: "<prefix>geocode",
	description: ""
};
