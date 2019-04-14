const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const fs = require("fs");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.help))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.help.permission,
				message
			)
		);

	// Delete your own command.
	await message.delete().catch();

	// Reply with instructions if the command is !help help.
	if (arguments[0] == "help")
		return message.author.send(
			response.command.chooseMessageResponse(
				personality.command.help.doublehelp,
				message,
				client.botConfig.prefix
			)
		);

	// Reply with a list of all commands if there are no valid arguments.
	if (arguments[0] == "list" || arguments.length <= 0) {
		// Check the file direktory for console commands
		fs.readdir("./src/commands", (err, files) => {
			let commandField = [];
			if (err) {
				console.log(err);
				return;
			}
			let jsfile = files.filter(f => f.split(".").pop() == "js");
			if (jsfile.length <= 0) return;
			jsfile.forEach((f, i) => {
				let props = require(`./${f}`);
				let commandName = f.split(".")[0];
				commandField.push({
					name: commandName,
					value: `${props.config.description ||
						"invalid description"}\n\`${props.config.usage ||
						"invalid usage"}\`\n alternative commands: \`${props.config.aliases.join(
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
					description:
						"Here is a list of all available commands the bot can execute.",
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
		});
	}

	// Reply with the information of a specified command.
	if (arguments[0]) {
		// Get command
		let command = arguments[0];
		if (client.commands.has(command)) {
			command = client.commands.get(command);

			// Create embed.
			let helpEmbed = new Discord.RichEmbed()
				.setTitle(`${command.config.name} information`)
				.setAuthor(client.user.username, client.user.avatarURL)
				.setDescription(
					`${command.config.description || "invalid description"}`
				)
				.setColor(color.help)
				.addField("Prefix", `${client.botConfig.prefix}`)
				.addField("Name", `${command.config.name}`)
				.addField(
					"Usage",
					`${command.config.usage || "invalid usage description"}`
				)
				.addField(
					"Aliases",
					`${command.config.aliases.join(", ") ||
						"no aliases for this command"}`
				)
				.setTimestamp()
				.setFooter(
					`${client.botConfig.prefix}help`,
					client.user.avatarURL
				);

			message.author.send(helpEmbed);
			return;
		}
	}
};

module.exports.config = {
	name: "help",
	aliases: ["h", "info"],
	usage: "<prefix>help <command or list>",
	description: ""
};