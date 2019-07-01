const {RichEmbed} = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const poll = response.command.poll;

module.exports = {
	config: {
		name: "poll",
		aliases: ["vote"],
		usage: "<prefix>poll <question>",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.poll))
			return message.reply("You don't have the right to make a poll.");

		// Delete your own command.
		await message.delete().catch();

		// Reply if no question was asked.
		if (arguments <= 0) return message.reply("Type in what this poll is about.");

		let pollEmbed = new RichEmbed().setTitle("Poll").setDescription(arguments.join(" "));
	}
};
