const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

const {command} = require("../utilities/personalityhelperlibrary.js");
const {unmute} = require("../utilities/personalityresponse.json");

module.exports = {
	config: {
		name: "unmute",
		aliases: [],
		usage: "<prefix>unmute <user>",
		description: ""
	},
	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.unmute))
			return message.reply(
				command.chooseMessageResponse(unmute.permission, message, arguments)
			);

		// Get mentioned user.
		let targetUser = message.guild.member(
			message.mentions.users.first() || message.guild.members.get(arguments[0])
		);
		// Check if the user exist.
		if (!targetUser)
			return message.reply(command.chooseMessageResponse(unmute.nouser, message, arguments));

		// Delete your own command.
		await message.delete().catch();

		// Get mute role.
		let muteRole = message.guild.roles.find("name", "muted");
		// Check if role exists.
		if (!muteRole)
			return message.channel.send(
				command.chooseMessageResponse(unmute.norole, message, arguments)
			);

		// Remove the role from the user.
		await targetUser.removeRole(muteRole.id);

		try {
			await targetUser.send(command.chooseMessageResponse(unmute.notify, message, arguments));
		} catch (err) {
			console.log(
				`[error] ${targetUser.user.tag} coudn't be DMed because of this error. ${err}`
			);
		}
	}
};
