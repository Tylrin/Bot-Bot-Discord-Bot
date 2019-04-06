const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");
const fs = require("fs");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.help)) return message.reply("You don't have the right to call for help.");

    // Delete your own command.
    await message.delete().catch();

    // Reply with instructions if the command is !help help.
    if (arguments[0] == "help") return message.author.send(`Use ${client.botConfig.prefix}help <command> or list to get the information you want.`);

    // Reply with a list of all commands if there are no valid arguments.
    if (arguments[0] == "list" || arguments.length <= 0) {
        // Check the file direktory for console commands
        fs.readdir("./src/commands", (err, files) => { 
            if (err) {
                console.log(err)
                return;
            }
            let jsfile = files.filter(f => f.split(".").pop() == "js");
            if (jsfile.length <= 0) return;
            console.log(`file ${jsfile}`);
            console.log(jsfile.length);
      
    
        // Create embed.
        let listEmbed = new Discord.RichEmbed()
        .setDescription(`${client.botConfig.prefix}help `)
        .setColor(color.help)
        .addField("Prefix", `${client.botConfig.prefix}`)
        .addField("Name", `${jsfile.join(", ")}`);

        console.log("list");
        message.author.send(listEmbed);
        return;
        })
    }

    if (arguments[0]) {
        // Get command
        let command = arguments[0];
        console.log("specific");
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            // Create embed.
            let helpEmbed = new Discord.RichEmbed()
            .setDescription(`${client.botConfig.prefix}help `)
            .setColor(color.help)
            .addField("Prefix", `${client.botConfig.prefix}`)
            .addField("Name", `${command.config.name}`)
            .addField("Aliases", `${command.config.aliases.join(", ") || "no aliases for this command"}`)
            .addField("Usage", `${command.config.usage || "invalid usage description"}`)
            .addField("Description", `${command.config.description || "invalid description"}`);

            message.author.send(helpEmbed);
            return;
        }
    }
}

module.exports.config = {
    name: "help",
    aliases: ["h", "info"],
    usage: "",
    description: ""
}