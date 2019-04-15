const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.serverinfo))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.serverinfo.permission,
				message,
				arguments
			)
		);

	// Delete your own command.
	await message.delete().catch();

	// Create embed.
	let serverIcon = message.guild.iconURL;
	let serverEmbed = new Discord.RichEmbed()
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
};

module.exports.config = {
	name: "serverinfo",
	aliases: ["si", "server", "serverdescription"],
	usage: "<prefix>serverinfo",
	description: ""
};
