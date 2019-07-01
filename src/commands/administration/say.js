const Discord = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const say = response.command.say;

module.exports = {
	config: {
		name: "say",
		aliases: ["s"],
		usage: "<prefix>say <message>",
		description: ""
	},
	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.say))
			return message.reply(command.chooseMessageResponse(say.permission, message, arguments));

		// Delete your own command.
		await message.delete().catch();

		// Get message.
		let botMessage = arguments.join(" ").trim();

		// Send message.
		message.channel.send(botMessage);
	}
};
