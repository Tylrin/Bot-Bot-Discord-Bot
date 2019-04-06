const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.shutdown)) return message.reply("You don't have the right to reload a command file.");

    // Delete your own command.
    await message.delete().catch();

    try {
        await message.channel.send("The Bot is shuting down.")
        process.exit()
    } catch(err) {
        console.log(err);
        message.channel.send(`ERROR: ${err.message}`);
    }
}

module.exports.config = {
    name: "shutdown",
    aliases: ["q", "quit", "exit"],
    usage: "",
    description: ""
}