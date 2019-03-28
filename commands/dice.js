const Discord = require('discord.js');
const Permissions = require('../utilities/commandpermission.json');

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.dicePermission)) { // Check permission for the command.
        message.reply("You don't have the right to roll dice.")
        return;
    };
    await message.delete().catch(); // Delete your own command.

    let diceNumber = Math.floor(Math.random() * (6 - 1 + 1) ) + 1;
    message.channel.send('You rolled a ' + diceNumber);
}

module.exports.help = {
    name: 'dice'
}