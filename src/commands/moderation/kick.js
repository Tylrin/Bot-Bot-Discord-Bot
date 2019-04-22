const {RichEmbed} = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const {kick} = require("../utilities/personalityresponse.json");

module.exports = {
	config: {
		name: "kick",
		aliases: [],
		usage: "<prefix>kick <user> <reason>",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.kick))
			return message.reply(
				command.chooseMessageResponse(kick.permission, message, arguments)
			);

		// Get mentioned user.
		let targetUser = message.guild.member(
			message.mentions.users.first() || message.guild.members.get(arguments[0])
		);
		// Check if the user exist.
		if (!targetUser)
			return message.reply(command.chooseMessageResponse(kick.nouser, message, arguments));
		// Check mentioned user permission.
		if (targetUser.hasPermission(permissions.kick))
			return message.reply(
				command.chooseMessageResponse(kick.nopermission, message, arguments)
			);
		// Is the client able to kick someone.
		if (!targetUser.kickable())
			return message.reply(
				command.chooseMessageResponse(kick.unkickable, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Get kick reason.
		let reason = arguments
			.join(" ")
			.slice(22)
			.trim();

		//Create embed.
		let kickEmbed = new Discord.RichEmbed()
			.setDescription("Kick")
			.setColor(color.kick)
			.addField("Kick User", `${targetUser} with ID ${targetUser.id}`)
			.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
			.addField("Channel", message.channel)
			.addField("Time", message.createdAt)
			.addField("Reasons", reason);

		// Get channel location.
		let kickChannel = message.guild.channels.find(`name`, "incidents");
		// Does the channel exist.
		if (!kickChannel)
			return message.channel.send(
				command.chooseMessageResponse(kick.nochannel, message, arguments)
			);

		// Kick user and send embed.
		message.guild.member(targetUser).kick(reason);
		kickChannel.send(kickEmbed);

		try {
			// Informe user directly over their guild kick.
			await targetUser.send(
				command.chooseMessageResponse(kick.notify, message, arguments, reason)
			);
		} catch (err) {
			console.log(
				`[error] ${targetUser.user.tag} couldn't be contacted because of this error: ${err}`
			);
		}
	}
};
