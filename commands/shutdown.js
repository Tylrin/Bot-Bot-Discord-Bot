const Discord = require("discord.js");
const Permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.shutdown)) { // Check permission for the command.
        message.reply("You don't have the right to reload a command file.")
        return;
    };
    await message.delete().catch(); // Delete your own command.

    try {
        await message.channel.send("The Bot is shuting down.");
        process.exit
    } catch(err) {
        console.log(err);
        message.channel.send(`ERROR: ${err.message}`);
    }
}

module.exports.config = {
    name: "shutdown",
    aliases: ["q", "quit", "exit"]
}