const Discord = require("discord.js");
const permissions = require("../utilities/commandpermission.json");
const color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    const config = client.config;
    const giphy = require("giphy-api")(config.giphyToken);
    
    // Check permission for the command.
    if (!message.member.hasPermission(permissions.gif)) return message.reply("You don't have the right to post gifs.");

    // Delete your own command.
    await message.delete().catch();

    // Check if there is a search term.
    if (!arguments[0]) return message.reply("Please put in a search term");
    let searchTerm = arguments[0];
    // Get the rating.
    let rating = 'g';
    if (arguments[1 == 'y'] || arguments[1 == 'g'] || arguments[1 == 'pg'] || arguments[1 == 'pg-13'] || arguments[1 == 'r']) {
        rating = arguments[1]
    };

    // Get random gif with options.
    giphy.random({
        tag: searchTerm,
        rating: rating,
        fmt: 'json'
    })
    .then((response) => {
        let finalResponse = response.data.images.fixed_height;
        let selectedImage = finalResponse.url;
        
        // Create embed.
        let gifEmbed = new Discord.RichEmbed()
        .setDescription(response.data.title)
        .setColor(color.gif)
        .setImage(selectedImage);

        message.channel.send(gifEmbed);
    }).catch((err) => {
        message.channel.send("Error ugh!");
        console.log(`Couldn't send gif because of this error: ${err}`);
    });
}

module.exports.config = {
    name: "gif",
    aliases: [],
    usage: "<prefix>gif <searchterm> <y, g, pg, pg-13, r",
    description: ""
}