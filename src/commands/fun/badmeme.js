const {RichEmbed} = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");
const fetch = require("node-fetch");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const badmeme = response.command.badmeme;

module.exports = {
	config: {
		name: "badmeme",
		aliases: [],
		usage: "<prefix>badmeme",
		description: ""
	},
	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.badmeme))
			return message.reply(
				command.chooseMessageResponse(badmeme.permission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Send preperation message.
		let msg = await message.channel.send(
			command.chooseMessageResponse(badmeme.load, message, arguments)
		);

		// Get data url.
		fetch("https://api-to.get-a.life/meme")
			.catch(err => console.error(err))
			.then(res => res.json())
			.then(body => {
				// Check if body exist.
				if (!body)
					return msg.reply(
						command.chooseMessageResponse(badmeme.errorload, message, arguments)
					);

				// Create embed.
				let memeEmbed = new RichEmbed()
					//.setTitle(body.text)
					.setColor(color.badmeme)
					.setImage(body.url)
					.setFooter("Meme", client.user.avatarURL);

				msg.edit(memeEmbed);
			});
	}
};
