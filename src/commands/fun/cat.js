const { RichEmbed } = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");
const fetch = require("node-fetch");

const { command } = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const catPath = response.command.cat;

module.exports = {
	config: {
		name: "cat",
		aliases: [],
		usage: "<prefix>cat",
		description: ""
	},
	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.cat))
			return message.reply(
				command.chooseMessageResponse(
					catPath.permission,
					message,
					arguments
				)
			);

		// Delete your own command.
		await message.delete().catch();

		// Send preperation message.
		let msg = await message.channel.send(
			command.chooseMessageResponse(catPath.load, message, arguments)
		);

		// Get data url.
		fetch("http://aws.random.cat/meow")
			.catch(err => {
				console.error(err);
				msg.edit(
					command.chooseMessageResponse(
						catPath.errorload,
						message,
						arguments
					)
				);
			})
			.then(res => res.json())
			.then(body => {
				// Check if body exist.
				if (!body)
					return msg.reply(
						command.chooseMessageResponse(
							catPath.errorload,
							message,
							arguments
						)
					);

				// Create embed.
				let catEmbed = new RichEmbed()
					.setTitle("Cat :cat:")
					.setColor(color.cat)
					.setImage(body.file);

				msg.edit(catEmbed);
			});
	}
};
