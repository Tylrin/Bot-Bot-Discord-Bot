const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");

module.exports.run = async (client, message, arguments) => {
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.clear)) return message.reply("You don't have the right to clear the chat.");

    // Delete your own command.
    await message.delete().catch();

    // Get how many messages should be deleted.
    let fetchedAmount = arguments[0]; 
    console.log(`${fetchedAmount} messages in search`);
    // Get all messages.
    let fetched = await message.channel.fetchMessages({limit: fetchedAmount});
    console.log(`[cmd] ${fetched.size} messages found`);

    // Delete messages.
    message.channel.bulkDelete(fetched.size)
    .then(() => {
        message.channel.send(`${fetched.size} messages deleted`).then(msg => msg.delete(5000));
    }).catch((err) => {
        message.channel.send(`Sorry coudn't delete the messages because of this error: ${err}`);
    }); 
}

module.exports.config = {
    name: "clear",
    aliases: ["c", "purge"],
    usage: "<prefix>clear <amount>",
    description: ""
}