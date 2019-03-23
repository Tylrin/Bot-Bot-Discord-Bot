const Discord = require('discord.js');
const config = require('../config.json');
const giphy = require('giphy-api')(config.giphyToken);

module.exports.run = async (client, message, arguments) => {
    if (message.member.hasPermission(['MANAGE_MESSAGES'])) {
        await message.delete(); // Delete the command
        if (arguments[0]) {
            let searchTerm = arguments[0];
            let rating = 'g';
            if (arguments[1 == 'y'] || arguments[1 == 'g'] || arguments[1 == 'pg'] || arguments[1 == 'pg-13'] || arguments[1 == 'r']) {
                rating = arguments[1]
            };
            console.log(rating)
            // Get random gif with options
            giphy.random({
                tag: searchTerm,
                rating: rating,
                fmt: 'json'
            })
            // Make a gif embed and send it
            .then((response) => {
                let finalResponse = response.data.images.fixed_height;
                let selectedImage = finalResponse.url;
                
                let gifEmbed = new Discord.RichEmbed()
                .setDescription(response.data.title)
                .setColor('#141619')
                .setImage(selectedImage);

                message.channel.send(gifEmbed);
            })
            .catch(() => {
                message.channel.send('Error ugh!');
            });
        } else {
            message.channel.reply('Please put in a search term')
        };
    } else {
        message.channel.send('No gif for you and remember it´s gif not gif');
    }
}

module.exports.help = {
    name: 'gif'
}