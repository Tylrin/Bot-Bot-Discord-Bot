const Discord = require('discord.js');

module.exports.run = async (client, message, arguments) => {
    let diceNumber = Math.floor(Math.random() * (6 - 1 + 1) ) + 1;
    message.channel.send('You rolled a ' + diceNumber)
}

module.exports.help = {
    name: 'dice'
}