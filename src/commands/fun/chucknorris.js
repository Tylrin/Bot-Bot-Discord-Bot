const {RichEmbed} = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const chucknorris = response.command.chucknorris;

module.exports = {
	config: {
		name: "chucknorris",
		aliases: ["chuck"],
		usage: "<prefix>chucknorris",
		description: ""
	},
	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.chucknorris))
			return message.reply(
				command.chooseMessageResponse(chucknorris.permission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Send preperation message.
		let msg = await message.channel.send(
			command.chooseMessageResponse(chucknorris.load, message, arguments)
		);

		// Get data url.
		fetch("https://api.chucknorris.io/jokes/random")
			.catch(err => console.error(err))
			.then(res => res.json())
			.then(body => {
				// Check if body exist.
				if (!body)
					return msg.reply(
						command.chooseMessageResponse(chucknorris.errorload, message, arguments)
					);

				// Create embed.
				let chuckEmbed = new RichEmbed()
					.setTitle("Chuck Norris Joke")
					.setDescription(body.value)
					.setColor(color.cat);

				msg.edit(chuckEmbed);
			});
	}
};
