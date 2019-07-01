const {RichEmbed} = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const ping = response.command.ping;

module.exports = {
	config: {
		name: "ping",
		aliases: ["latency"],
		usage: "<prefix>ping",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.ping))
			return message.reply(
				command.chooseMessageResponse(ping.permission, message, arguments)
			);

		// Message channel.
		message.channel.send("Pinging...").then(msg => {
			// Measure the ping of the message.
			let ping = msg.createdTimestamp - message.createdTimestamp;

			// Edit message
			msg.edit(command.chooseMessageResponse(ping.notify, message, arguments));

			// Create embed.
			let pingEmbed = new RichEmbed()
				.setDescription("Latency")
				.setColor(color.ping)
				.addField("Bot Latency", ping)
				.addField("API Lateny", Math.round(client.ping));

			message.channel.send(pingEmbed);
		});
	}
};
