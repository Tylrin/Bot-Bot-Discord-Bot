const {RichEmbed} = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const {botinfo} = require("../utilities/personalityresponse.json");

module.exports = {
	config: {
		name: "botinfo",
		aliases: ["bi", "bot", " botdescription"],
		usage: "<prefix>botinfo",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.botinfo))
			return message.reply(
				command.chooseMessageResponse(botinfo.permission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Create embed.
		let botIcon = client.user.displayAvatarURL;
		let botEmbed = new RichEmbed()
			.setTitle("Bot Information")
			.setColor(color.botinfo)
			.setThumbnail(botIcon)
			.addField("Bot Name", client.user.username)
			.addField("Created On", client.user.createdAt)
			.addField("Version", client.botInfo.version)
			.addField("Author", client.botInfo.author)
			.setTimestamp()
			.setFooter(`${client.botConfig.prefix}botinfo`, client.user.avatarURL);

		message.author.send(botEmbed);
	}
};
