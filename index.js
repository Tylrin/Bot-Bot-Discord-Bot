const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = require("./config.json");
client.botConfig = require("./config.bot.json");

// Check the file direktory for console commands
fs.readdir("./src/commands/", (err, files) => { 
    if (err) {
        console.log(err)
        return;
    }
    let jsfile = files.filter(f => f.split(".").pop() == "js");
    if (jsfile.length <= 0) {
        console.log("Cound't find commands")
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./src/commands/${f}`);
        console.log(`${f} loaded`);
        client.commands.set(props.config.name, props); // Check file name
        props.config.aliases.forEach(alias => { // Check file aliases
            client.aliases.set(alias, props.config.name)
        });
    });
});

// Check the file direktory for events
fs.readdir("./src/events/", (err, files) => {
    if (err) {
        console.log(err)
        return;
    }
    let jsfile = files.filter(f => f.split(".").pop() == "js");
    if (jsfile.length <= 0) {
        console.log("Cound't find events")
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./src/events/${f}`);
        let fileName = f.split(".")[0];
        console.log(`${fileName} loaded`);
        client.on(fileName, props.bind(null, client));
        delete require.cache[require.resolve(`./src/events/${f}`)];
    });
});

client.login(client.config.token);