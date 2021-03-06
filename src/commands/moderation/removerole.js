const Discord = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const removerolePath = response.command.removerole;

module.exports = {
	config: {
		name: "removerole",
		aliases: [],
		usage: "<prefix>removerole <user> <role>",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.removerole))
			return message.reply(
				command.chooseMessageResponse(removerolePath.permission, message, arguments)
			);

		// Get mentioned user.
		let targetUser = message.guild.member(
			message.mentions.users.first() || message.guild.members.get(arguments[0])
		);
		// Check if the user exist.
		if (!targetUser)
			return message.reply(
				command.chooseMessageResponse(removerolePath.nouser, message, arguments)
			);
		// Check mentioned user permission.
		if (rolenUser.hasPermission(permissions.removerole))
			return message.reply(
				command.chooseMessageResponse(removerolePath.nopermission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Check for a specified role.
		let role = arguments.join("").slice(22);
		if (!role)
			return message.reply(
				command.chooseMessageResponse(removerolePath.norole, message, arguments)
			);

		// Check if the role exists.
		let guildRole = message.guild.roles.find(`name`, role);
		if (!guildRole)
			return message.reply(
				command.chooseMessageResponse(removerolePath.unfoundrole, message, arguments)
			);

		// Check if the don't have the role.
		if (!targetUser.roles.has(guildRole.id))
			return message.reply(
				command.chooseMessageResponse(removerolePath.hasnotrole, message, arguments)
			);

		// Remove the role from the user.
		await targetUser.removeRole(guildRole.id);

		try {
			// Informe user directly over their guild role remove.
			await targetUser.send(
				command.chooseMessageResponse(
					removerolePath.notify,
					message,
					arguments,
					guildRole.name
				)
			);
		} catch (err) {
			console.log(
				`[error] ${roelUser.user.tag} couldn't be contacted because of this error: ${err}`
			);
		}
	}
};
