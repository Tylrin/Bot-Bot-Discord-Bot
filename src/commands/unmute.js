const Discord = require("discord.js");
const ms = require("ms");
const permissions = require("../utilities/commandpermission.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.unmute))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.unmute.permission,
				message,
				arguments
			)
		);

	// Get mentioned user.
	let targetUser = message.guild.member(
		message.mentions.users.first() || message.guild.members.get(arguments[0])
	);
	// Check if the user exist.
	if (!targetUser)
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.unmute.nouser,
				message,
				arguments
			)
		);

	// Delete your own command.
	await message.delete().catch();

	// Get mute role.
	let muteRole = message.guild.roles.find("name", "muted");
	// Check if role exists.
	if (!muteRole)
		return message.channel.send(
			response.command.chooseMessageResponse(
				personality.command.unmute.norole,
				message,
				arguments
			)
		);

	// Remove the role from the user.
	await targetUser.removeRole(muteRole.id);

	try {
		await targetUser.send(
			response.command.chooseMessageResponse(
				personality.command.unmute.notify,
				message,
				arguments
			)
		);
	} catch (err) {
		console.log(`[error] ${targetUser.user.tag} coudn't be DMed because of this error. ${err}`);
	}
};

module.exports.config = {
	name: "unmute",
	aliases: [],
	usage: "<prefix>unmute <user>",
	description: ""
};
