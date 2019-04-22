const {RichEmbed} = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const {report} = require("../utilities/personalityresponse.json");

module.exports = {
	config: {
		name: "report",
		aliases: [],
		usage: "<prefix>report <user>",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.report))
			return message.reply(
				command.chooseMessageResponse(report.permission, message, arguments)
			);

		// Get mentioned user.
		let targetUser = message.guild.member(
			message.mentions.users.first() || message.guild.members.get(arguments[0])
		);
		// Check if the user exist.
		if (!targetUser)
			return message.reply(command.chooseMessageResponse(report.nouser, message, arguments));
		// Can the user be banned.
		if (targetUser.hasPermission(permissions.report))
			return message.reply(
				command.chooseMessageResponse(report.nopermission, message, arguments)
			);

		// Delete your own command
		await message.delete().catch();

		let reason = arguments
			.join(" ")
			.slice(22)
			.trim();

		let reportEmbed = new RichEmbed()
			.setDescription("Reports")
			.setColor(color.report)
			.addField("Reported User", `${targetUser} with ID: ${targetUser.id}`)
			//.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
			.addField("Channel", message.channel)
			.addField("Time", message.createdAt)
			.addField("Reasons", reason);

		let reportsChannel = message.guild.channels.find(`name`, "reports");
		if (!reportsChannel)
			return message.channel.send(
				command.chooseMessageResponse(report.nochannel, message, arguments)
			);

		reportsChannel.send(reportEmbed);
	}
};
