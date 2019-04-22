const {RichEmbed} = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const {git} = require("../utilities/personalityresponse.json");

module.exports = {
	config: {
		name: "git",
		aliases: [],
		usage: "<prefix>git",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.serverinfo))
			return message.reply(command.chooseMessageResponse(git.permission, message, arguments));

		// Delete your own command.
		await message.delete().catch();

		// Create embed.
		let gitEmbed = new RichEmbed()
			.setTitle(`${client.botInfo.name} Git reposetory`)
			.setDescription(
				"This is the reposetory where you can find the code that is used by this bot."
			)
			.setURL("https://github.com/Tylrin/The-Source-Bot")
			.setColor(color.git)
			.setTimestamp()
			.setFooter("Git Command", client.user.avatarURL);

		message.author.send(gitEmbed);
	}
};
