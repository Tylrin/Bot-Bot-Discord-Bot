const Discord = require("discord.js");
const config = require("../config.json");
const giphy = require("giphy-api")(config.giphyToken);
const Permissions = require("../utilities/commandpermission.json");
const Color = require("../utilities/commandcolor.json");

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.gif)) { // Check permission for the command.
        message.reply("You don't have the right to post gifs.")
        return;
    };
    await message.delete().catch(); // Delete your own command.

    if (!arguments[0]) {
        message.reply("Please put in a search term");
        return;
    };
    let searchTerm = arguments[0];
    let rating = 'g';
    if (arguments[1 == 'y'] || arguments[1 == 'g'] || arguments[1 == 'pg'] || arguments[1 == 'pg-13'] || arguments[1 == 'r']) {
        rating = arguments[1]
    };
    console.log(rating)
    // Get random gif with options.
    giphy.random({
        tag: searchTerm,
        rating: rating,
        fmt: 'json'
    })
    // Make a gif embed and send it.
    .then((response) => {
        let finalResponse = response.data.images.fixed_height;
        let selectedImage = finalResponse.url;
                
        let gifEmbed = new Discord.RichEmbed()
        .setDescription(response.data.title)
        .setColor(Color.gifColor)
        .setImage(selectedImage);

        message.channel.send(gifEmbed);
    }).catch(() => {
        message.channel.send("Error ugh!");
    });
}

module.exports.config = {
    name: "gif",
    aliases: []
}