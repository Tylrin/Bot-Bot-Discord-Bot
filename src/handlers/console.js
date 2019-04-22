module.exports = client => {
	let prompt = process.openStdin();
	prompt.addListener("data", res => {
		let x = res
			.toString()
			.trim()
			.split(/ +/g);
		client.channels.get("429321045632221195").send(x.join(" "));
	});
};
