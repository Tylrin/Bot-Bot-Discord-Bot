const {RichEmbed} = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const fetch = require("node-fetch");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

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
				response.command.chooseMessageResponse(
					personality.command.cat.permission,
					message,
					arguments
				)
			);

		// Delete your own command.
		await message.delete().catch();

		// Send preperation message.
		let msg = await message.channel.send(
			response.command.chooseMessageResponse(personality.command.cat.load, message, arguments)
		);

		// Get data url.
		fetch("http://aws.random.cat/meow")
			.then(res => res.json())
			.then(body => {
				// Check if body exist.
				if (!body)
					return msg.reply(
						response.command.chooseMessageResponse(
							personality.command.cat.errorload,
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
