const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.eightball))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.reload.permission,
				message
			)
		);

	// Delete your own command.
	await message.delete().catch();

	// Check if there is a file name.
	if (!arguments[0])
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.reload.nofile,
				message
			)
		);

	// Try reloading the file.
	let commandFile =
		client.commands.get(arguments[0].toLowerCase()) ||
		client.commands.get(client.aliases.get(arguments[0].toLowerCase())); // Get the command file
	let commandName = commandFile.config.name;

	try {
		delete require.cache[require.resolve(`./${commandName}.js`)];
		client.commands.delete(commandName);
		const pull = require(`./${commandName}.js`);
		client.commands.set(commandName, pull);
	} catch (err) {
		message.reply(`Could not reload ${commandName}.js`);
		return;
	}

	message.channel.send(
		response.command.chooseMessageResponse(
			personality.command.reload.notify,
			message,
			commandName
		)
	);
};

module.exports.config = {
	name: "reload",
	aliases: [],
	usage: "<prefix>reload <command>",
	description: ""
};
