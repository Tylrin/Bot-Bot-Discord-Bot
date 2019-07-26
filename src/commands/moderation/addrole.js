const Discord = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const addrolePath = response.command.addrole;

module.exports = {
	config: {
		name: "addrole",
		aliases: [],
		usage: "<prefix>addrole <user> <role>",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.addrole))
			return message.reply(
				command.chooseMessageResponse(addrolePath.permission, message, arguments)
			);

		// Get mentioned user.
		let targetUser = message.guild.member(
			message.mentions.users.first() || message.guild.members.get(arguments[0])
		);
		// Check if the user exist.
		if (!targetUser)
			return message.reply(
				command.chooseMessageResponse(addrolePath.nouser, message, arguments)
			);
		// Check mentioned user permission.
		if (rolenUser.hasPermission(permissions.addrole))
			return message.reply(
				command.chooseMessageResponse(addrolePath.nopermission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Get the specified role.
		let role = arguments.join(" ").slice(22);
		if (!role)
			return message.reply(
				command.chooseMessageResponse(addrolePath.norole, message, arguments)
			);

		// Check if the role exists.
		let guildRole = message.guild.roles.find(`name`, role);
		if (!guildRole)
			return message.reply(
				command.chooseMessageResponse(addrolePath.unfoundrole, message, arguments)
			);

		// Check if the user has the role already.
		if (!targetUser.roles.has(guildRole.id))
			return message.reply(
				command.chooseMessageResponse(
					addrolePath.hasrole,
					message,
					arguments,
					guildRole.name
				)
			);
		// Add the role to the user.
		await targetUser.addRole(guildRole.id);

		try {
			// Informe user directly over the added role.   guildRole.name
			await targetUser.send(
				command.chooseMessageResponse(
					addrolePath.notify,
					message,
					arguments,
					guildRole.name
				)
			);
		} catch (err) {
			console.log(
				`[error] The user ${
					targetUser.user.tag
				} couldn't be contacted because of this error: ${err}`
			);
		}
	}
};
