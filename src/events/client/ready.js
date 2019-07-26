module.exports = client => {
	// Initialize Bot
	const botConfig = client.botConfig;
	const botpackage = require("../../../package.json");

	// Change status activity
	let statuses = [
		`${botConfig.prefix}help`,
		`over ${client.guilds.size} users!`,
		`connected to ${client.users.size} users`
	];

	let statusIntervalTime = 10000;

	setInterval(function() {
		// Calculate status
		let status = statuses[Math.floor(Math.random() * statuses.length)];

		// Change activity
		client.user.setActivity(status, {type: "WATCHING"});
	}, statusIntervalTime);

	if (client.user.username !== botpackage.name) {
		// Set username
		client.user
			.setUsername(`${botpackage.name}`)
			.then(user => console.log(`My new username is ${user.username}`))
			.catch(console.error);
	}

	console.log(`${client.user.username} is online!`);
};
