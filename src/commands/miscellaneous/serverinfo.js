const {RichEmbed} = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const serverinfoPath = response.command.serverinfo;

module.exports = {
	config: {
		name: "serverinfo",
		aliases: ["si", "server", "serverdescription"],
		usage: "<prefix>serverinfo",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.serverinfo))
			return message.reply(
				command.chooseMessageResponse(serverinfoPath.permission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Create embed.
		let serverIcon = message.guild.iconURL;
		let serverEmbed = new RichEmbed()
			.setTitle("Server Information")
			.setColor(color.serverinfo)
			.setThumbnail(serverIcon)
			.addField("Server Name", message.guild.name)
			.addField("Created On", message.guild.createdAt)
			.addField("You Joined", message.member.joinedAt)
			.addField("Total Members", message.guild.memberCount)
			.setTimestamp()
			.setFooter(`${client.botConfig.prefix}serverinfo`, client.user.avatarURL);

		message.author.send(serverEmbed);
	}
};
