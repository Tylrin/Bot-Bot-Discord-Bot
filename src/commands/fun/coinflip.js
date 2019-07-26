const {RichEmbed} = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const coinflipPath = response.command.coinflip;

module.exports = {
	config: {
		name: "coinflip",
		aliases: [],
		usage: "<prefix>coinflip",
		description: ""
	},
	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.coinflip))
			return message.reply(
				command.chooseMessageResponse(coinflipPath.permission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Calculate replies.
		let replies = ["head", "tails"];
		let result = Math.floor(Math.random() * replies.length);

		// Create embed.
		let coinEmbed = new RichEmbed()
			.setAuthor(message.author.tag)
			.setColor(color.coinflip)
			.addField("Coin Face", replies[result]);

		message.channel.send(coinEmbed);
	}
};
