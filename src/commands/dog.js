const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const superagent = require("superagent");

const response = require("../utilities/personalityhelperlibrary.js");
const personality = require("../utilities/personalityresponse.json");

module.exports.run = async (client, message, arguments) => {
	// Check permission for the command.
	if (!message.member.hasPermission(permissions.dog))
		return message.reply(
			response.command.chooseMessageResponse(
				personality.command.dog.permission,
				message
			)
		);

	// Delete your own command.
	await message.delete().catch();

	// Send preperation message.
	let msg = await message.channel.send(
		response.command.chooseMessageResponse(
			personality.command.dog.load,
			message
		)
	);

	// Get data url.
	let {body} = await superagent.get("https://random.dog/woof.json");

	// Check if body exist.
	if (!body)
		return msg.reply(
			response.command.chooseMessageResponse(
				personality.command.dog.errorload,
				message
			)
		);

	// Create embed.
	let dogEmbed = new Discord.RichEmbed()
		.setTitle("Doggo :dog:")
		.setColor(color.dog)
		.setImage(body.url);

	msg.edit(dogEmbed);
};

module.exports.config = {
	name: "dog",
	aliases: [],
	usage: "<prefix>dog",
	description: ""
};
