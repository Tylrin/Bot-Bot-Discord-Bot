const Discord = require('discord.js');

module.exports.run = async (client, message, arguments) => {
    await message.delete(); // Delete the command
    if (message.member.hasPermission(['MANAGE_MESSAGES'])) { // Has permission to delete messages
        let fetchAmount = arguments[0]; // Grab how many messages should be deleted

        let fetched = await message.channel.fetchMessages({limit: fetchAmount}); // Get all messages
        console.log(`${fetched.size} messages found`);
        
        message.channel.bulkDelete(fetched) // Delete messages
            .then(() => {
                message.channel.send(`${fetched} messages deleted`)
            }).catch((err) => {
                message.channel.send(`sssSorry coudn't delete the messages because of this error: ${err}`)
            });
        
    } else {
        message.channel.send('sorry can´t let you just delete these messages!');
    }
}

module.exports.help = {
    name: 'clear'
}