module.exports.command = {
	chooseMessageResponse: function(replies, message, arguments, custom) {
		const st = require("stjs");

		// Check for valid replies.
		if (!replies) return "none";

		var data = {
			author: `${message.author.username}`,
			guild: `${message.guild.name}`,
			user:
				message.guild.member(message.mentions.users.first()) ||
				message.guild.members.get(arguments[0]),
			channel: `${message.channel}`,
			custom: custom
		};

		// Calculate response.
		let index = Math.floor(Math.random() * replies.length);
		let template = replies[index];

		// Fill in variables for template.
		let result = st.transform(template, data);

		// Get result.
		return result;
	}
};

module.exports.event = {
	chooseEventResponse: function(client) {}
};
