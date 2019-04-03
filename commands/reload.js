const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.reload)) return message.reply("You don't have the right to reload a command file.");
    
    // Delete your own command.
    await message.delete().catch();

    // Check if there is a file name.
    if (!arguments[0]) return message.reply("Please provide a command to reload.");

    // Try reloading the file.
    let commandName = arguments[0].toLowerCase()
    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        client.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        client.commands.set(commandName, pull)
    } catch(err) {
        message.reply(`Could not reload ${commandName}.js`)
        return;
    }

    message.channel.send(`The command ${commandName} has been reloaded.`)
}

module.exports.config = {
    name: "reload",
    aliases: []
}