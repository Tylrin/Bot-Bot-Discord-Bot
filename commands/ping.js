const Discord = require('discord.js');

module.exports.run = async (client, message, arguments) => {
    message.channel.send('Pong!')
}

module.exports.help = {
    name: 'ping'
}