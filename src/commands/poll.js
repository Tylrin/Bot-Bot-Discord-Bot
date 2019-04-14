const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.poll))
		return message.reply("You don't have the right to make a poll.");

	// Delete your own command.
	await message.delete().catch();

	// Reply if no question was asked.
	if (arguments <= 0)
		return message.reply("Type in what this poll is about.");

	let pollEmbed = new Discord.RichEmbed()
		.setTitle("Poll")
		.setDescription(arguments.join(" "));
};

module.exports.config = {
	name: "poll",
	aliases: ["vote"],
	usage: "<prefix>poll <question>",
	description: ""
};
