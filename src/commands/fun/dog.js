const {RichEmbed} = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const dog = response.command.dog;

module.exports = {
	config: {
		name: "dog",
		aliases: [],
		usage: "<prefix>dog",
		description: ""
	},
	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.dog))
			return message.reply(command.chooseMessageResponse(dog.permission, message, arguments));

		// Delete your own command.
		await message.delete().catch();

		// Send preperation message.
		let msg = await message.channel.send(
			command.chooseMessageResponse(dog.load, message, arguments)
		);

		// Get data url.
		fetch("https://random.dog/woof.json")
			.catch(err => console.error(err))
			.then(res => res.json())
			.then(body => {
				// Check if body exist.
				if (!body)
					return msg.reply(
						command.chooseMessageResponse(dog.errorload, message, arguments)
					);

				// Create embed.
				let dogEmbed = new RichEmbed()
					.setTitle("Doggo :dog:")
					.setColor(color.dog)
					.setImage(body.url);

				msg.edit(dogEmbed);
			});
	}
};
