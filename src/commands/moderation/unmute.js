const Discord = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const unmutePath = response.command.unmute;

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
				command.chooseMessageResponse(unmutePath.permission, message, arguments)
			);

		// Get mentioned user.
		let targetUser = message.guild.member(
			message.mentions.users.first() || message.guild.members.get(arguments[0])
		);
		// Check if the user exist.
		if (!targetUser)
			return message.reply(
				command.chooseMessageResponse(unmutePath.nouser, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Get mute role.
		let muteRole = message.guild.roles.find("name", "muted");
		// Check if role exists.
		if (!muteRole)
			return message.channel.send(
				command.chooseMessageResponse(unmutePath.norole, message, arguments)
			);

		// Remove the role from the user.
		await targetUser.removeRole(muteRole.id);

		try {
			await targetUser.send(
				command.chooseMessageResponse(unmutePath.notify, message, arguments)
			);
		} catch (err) {
			console.log(
				`[error] ${targetUser.user.tag} coudn't be DMed because of this error. ${err}`
			);
		}
	}
};
