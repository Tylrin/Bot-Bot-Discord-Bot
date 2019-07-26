const Discord = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const dicePath = response.command.dice;

module.exports = {
	config: {
		name: "dice",
		aliases: [],
		usage: "<prefix>dice",
		description: ""
	},
	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.dice))
			return message.reply(
				command.chooseMessageResponse(dicePath.permission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Calculate response.
		let diceNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		message.channel.send(
			command.chooseMessageResponse(dicePath.replies, message, arguments, diceNumber)
		);
	}
};
