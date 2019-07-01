const {readdirSync} = require("fs");

module.exports = client => {
	const load = dir => {
		const commands = readdirSync(`./src/commands/${dir}/`).filter(d => d.endsWith(".js"));
		for (let file of commands) {
			console.log(`${file} loaded`);
			const pull = require(`../commands/${dir}/${file}`);
			client.commands.set(pull.config.name, pull);
			if (pull.config.aliases) {
				pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
			}
		}
	};
	["administration", "fun", "miscellaneous", "moderation"].forEach(x => load(x));
};
