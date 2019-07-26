const {RichEmbed} = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const banPath = response.command.ban;

module.exports = {
	config: {
		name: "ban",
		aliases: ["b", "banish", "remove"],
		usage: "<prefix>ban <user>",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.ban))
			return message.reply(
				command.chooseMessageResponse(banPath.permission, message, arguments)
			);

		// Get mentioned user.
		let targetUser = message.guild.member(
			message.mentions.users.first() || message.guild.members.get(arguments[0])
		);
		// Check if the user exist.
		if (!targetUser)
			return message.reply(command.chooseMessageResponse(banPath.nouser, message, arguments));
		// Check mentioned user permission.
		if (targetUser.hasPermission(permissions.ban))
			return message.reply(
				command.chooseMessageResponse(banPath.nopermission, message, arguments)
			);
		// Is the client able to ban someone.
		if (!targetUser.bannable())
			return message.reply(
				command.chooseMessageResponse(banPath.unbannable, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Get ban reason.
		let reason = arguments
			.join(" ")
			.slice(22)
			.trim();

		// Create embed.
		let banEmbed = new RichEmbed()
			.setDescription("Ban")
			.setColor(color.ban)
			.addField("Banned User", `${targetUser} with ID ${targetUser.id}`)
			//.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
			.addField("Channel", message.channel)
			.addField("Time", message.createdAt)
			.addField("Reasons", !!reason ? reason : "No reason named.");

		// Get channel location.
		let banChannel = message.guild.channels.find(`name`, "incidents");
		// Does the channel exist.
		if (!banChannel)
			return message.channel.send(
				command.chooseMessageResponse(banPath.nochannel, message, arguments)
			);

		// Ban user and send embed.
		message.guild.ban(targetUser, {day: 1, reason: reason}).catch(err => console.log(err));
		banChannel.send(banEmbed).catch();

		try {
			// Informe user directly over their guild ban.
			await targetUser.send(
				command.chooseMessageResponse(banPath.notify, message, arguments)
			);
		} catch (err) {
			console.log(
				`[error] ${targetUser.user.tag} couldn't be contacted because of this error: ${err}`
			);
		}
	}
};
