const Discord = require("discord.js");
const Permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.reload)) { // Check permission for the command.
        message.reply("You don't have the right to reload a command file.")
        return;
    };
    await message.delete().catch(); // Delete your own command.

    if (!arguments[0]) return message.reply("Please provide a command to reload.");

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