const {RichEmbed} = require("discord.js");
const permissions = require("../../utilities/commandpermission.json");
const color = require("../../utilities/commandcolor.json");

const {command} = require("../../utilities/personalityhelperlibrary.js");
const response = require("../../utilities/personalityresponse.json");
const helpPath = response.command.help;

module.exports = {
	config: {
		name: "help",
		aliases: ["h", "info"],
		usage: "<prefix>help <command or list>",
		description: ""
	},

	run: async (client, message, arguments) => {
		// Check permission for the command.
		if (!message.member.hasPermission(permissions.help))
			return message.reply(
				command.chooseMessageResponse(helpPath.permission, message, arguments)
			);

		// Delete your own command.
		await message.delete().catch();

		// Reply with instructions if the command is !help help.
		if (arguments[0] == "help")
			return message.author.send(
				command.chooseMessageResponse(
					helpPath.doublehelp,
					message,
					arguments,
					client.botConfig.prefix
				)
			);

		// Reply with a list of all commands if there are no valid arguments.
		if (arguments[0] == "list" || arguments.length <= 0) {
			let commandField = [];

			// Get commands from client
			client.commands.forEach((f, i) => {
				let command = f;
				let name = command.config.name;
				commandField.push({
					name: name,
					value: `${command.config.description || "invalid description"}\n\`${command
						.config.usage ||
						"invalid usage"}\`\n alternative commands: \`${command.config.aliases.join(
						", "
					) || "no aliases for this command"}\``
				});
			});

			// Create embed as json object.
			message.author.send({
				embed: {
					title: "A list of all commands",
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL
					},
					description: "Here is a list of all available commands the bot can execute.",
					color: (color.help, 1),
					fields: commandField,
					timestamp: new Date(),
					footer: {
						icon_url: client.user.avatarURL,
						text: `${client.botConfig.prefix}help`
					}
				}
			});
			return;
		}

		// Reply with the information of a specified command.
		if (arguments[0]) {
			// Get command
			let command = arguments[0];
			if (client.commands.has(command)) {
				command = client.commands.get(command);

				// Create embed.
				let helpEmbed = new RichEmbed()
					.setTitle(`${command.config.name} information`)
					.setAuthor(client.user.username, client.user.avatarURL)
					.setDescription(`${command.config.description || "invalid description"}`)
					.setColor(color.help)
					.addField("Prefix", `${client.botConfig.prefix}`)
					.addField("Name", `${command.config.name}`)
					.addField("Usage", `${command.config.usage || "invalid usage description"}`)
					.addField(
						"Aliases",
						`${command.config.aliases.join(", ") || "no aliases for this command"}`
					)
					.setTimestamp()
					.setFooter(`${client.botConfig.prefix}help`, client.user.avatarURL);

				message.author.send(helpEmbed);
				return;
			}
		}
	}
};
