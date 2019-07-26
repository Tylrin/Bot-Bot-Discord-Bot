const {RichEmbed} = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const eightballPath = response.command.eightball;

module.exports = {
	config: {
		name: "8ball",
		aliases: ["8"],
		usage: `<prefix>8ball <your question>`,
		description: ""
	},
	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.eightball))
			return message.reply(
				command.chooseMessageResponse(eightballPath.permission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Get the question.
		let question = arguments
			.slice(0)
			.join(" ")
			.trim();
		// Was a valid question asked.
		if (!question)
			return message.reply(
				command.chooseMessageResponse(eightballPath.noquestion, message, arguments)
			);

		// Calculate replies.
		let replies = command.chooseMessageResponse(
			eightballPath.replies,
			message,
			arguments,
			question
		);

		// Create embed.
		let ballEmbed = new RichEmbed()
			.setAuthor(message.author.tag)
			.setColor(color.eightball)
			.addField("Question", question)
			.addField("Answer", replies)
			.setFooter(`${client.botConfig.prefix}8ball`, client.user.avatarURL);

		message.channel.send(ballEmbed);
	}
};
