const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const {clear} = require("../utilities/personalityresponse.json");

module.exports = {
	config: {
		name: "clear",
		aliases: ["c", "purge"],
		usage: "<prefix>clear <amount>",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.clear))
			return message.reply(
				command.chooseMessageResponse(clear.permission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Get how many messages should be deleted.
		let fetchedAmount = arguments[0];
		console.log(`${fetchedAmount} messages in search`);
		// Get all messages.
		let fetched = await message.channel.fetchMessages({limit: fetchedAmount});
		console.log(`[cmd] ${fetched.size} messages found`);

		// Delete messages.
		message.channel
			.bulkDelete(fetched.size)
			.then(() => {
				message.channel
					.send(
						command.chooseMessageResponse(
							clear.notify,
							message,
							arguments,
							fetched.size
						)
					)
					.then(msg => msg.delete(5000));
			})
			.catch(err => {
				message.channel.send(
					command.chooseMessageResponse(clear.error, message, arguments, err)
				);
			});
	}
};
