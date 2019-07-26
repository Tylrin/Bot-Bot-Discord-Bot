const Discord = require("discord.js");
const ms = require("ms");
const permissions = require("../../utilities/commandpermission.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const mutePath = response.command.mute;

module.exports = {
	config: {
		name: "mute",
		aliases: ["silence"],
		usage: "<prefix>mute <user> <time>",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.mute))
			return message.reply(
				command.chooseMessageResponse(mutePath.permission, message, arguments)
			);

		// Get mentioned user.
		let targetUser = message.guild.member(
			message.mentions.users.first() || message.guild.members.get(arguments[0])
		);
		// Check if the user exist.
		if (!targetUser)
			return message.reply(
				command.chooseMessageResponse(mutePath.nouser, message, arguments)
			);
		// Check mentioned user permission.
		if (targetUser.hasPermission(permissions.mute))
			return message.reply(
				command.chooseMessageResponse(mutePath.nopermission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Get mute role.
		let muteRole = message.guild.roles.find(`name`, "muted");
		// If it doesn't exist, create it.
		if (!muteRole) {
			try {
				muteRole = await message.guild.createRole({
					name: "muted",
					color: "#000000",
					permissions: []
				});
				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermissions(muteRole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					});
				});
			} catch (err) {
				console.log(err.stack);
			}
		}
		// Set mute time
		let muteTime = arguments[1];
		if (!muteTime)
			return message.reply(
				command.chooseMessageResponse(mutePath.notime, message, arguments)
			);

		// Add the role to the user.
		await targetUser.addRole(muteRole.id);

		try {
			await targetUser.send(
				command.chooseMessageResponse(mutePath.notify, message, ms(ms(muteTime)))
			);
		} catch (err) {
			console.log(
				`[error] ${targetUser.user.tag} coudn't be DMed because of this error. ${err}`
			);
		}
	}
};
