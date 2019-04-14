const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.botinfo))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.botinfo.permission,
				message
			)
		);

	// Delete your own command.
	await message.delete().catch();

	// Create embed.
	let botIcon = client.user.displayAvatarURL;
	let botEmbed = new Discord.RichEmbed()
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
};

module.exports.config = {
	name: "botinfo",
	aliases: ["bi", "bot", " botdescription"],
	usage: "<prefix>botinfo",
	description: ""
};
