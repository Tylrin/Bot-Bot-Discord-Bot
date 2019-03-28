const Discord = require('discord.js');
const Permissions = require('../utilities/commandpermission.json');

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.clearPermission)) { // Check permission for the command.
        message.reply("You don't have the right to clear the chat.")
        return;
    };
    await message.delete().catch(); // Delete your own command.

    let fetchedAmount = arguments[0]; // Grab how many messages should be deleted.
    console.log(`${fetchedAmount} messages in search`)
    let fetched = await message.channel.fetchMessages({limit: fetchedAmount}); // Get all messages.
    console.log(`${fetched.size} messages found`);
        
    message.channel.bulkDelete(fetched.size) // Delete messages.
    .then(() => {
        message.channel.send(`${fetched.size} messages deleted`)
    }).catch((err) => {
        message.channel.send(`sssSorry coudn't delete the messages because of this error: ${err}`)
    }); 
}

module.exports.help = {
    name: 'clear'
}