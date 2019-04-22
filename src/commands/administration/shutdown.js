const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const {shutdown} = require("../utilities/personalityresponse.json");

module.exports = {
	config: {
		name: "shutdown",
		aliases: ["q", "quit", "exit"],
		usage: "<prefix>shutdown",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.shutdown))
			return message.reply(
				command.chooseMessageResponse(shutdown.permission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		try {
			await message.channel.send(
				command.chooseMessageResponse(shutdown.notify, message, arguments)
			);
			process.exit();
		} catch (err) {
			console.log(err);
			message.channel.send(`[error] ${err.message}`);
		}
	}
};
