const {readdirSync} = require("fs");

module.exports = client => {
	const load = dir => {
		const events = readdirSync(`./src/events/${dir}/`).filter(d => d.endsWith(".js"));
		for (let file of events) {
			const evt = require(`../events/${dir}/${file}`);
			let eName = file.split(".")[0]; // .pop() == "js"
			client.on(eName, evt.bind(null, client));
		}
	};
	["client", "guild"].forEach(x => load(x));
};
