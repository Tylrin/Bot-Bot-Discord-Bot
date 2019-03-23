const Discord = require('discord.js');

module.exports.run = async (client, message, arguments) => {
    await message.delete(); // Delete the command
    if (!arguments[2]) return message.reply('Please ask a full question!');
    let replies = ['Yes.', 'No.', 'I don´t know.', 'Ask again later.'];

    let result = Math.floor((Math.random() * replies.length));
    let question = arguments.slice(0).join(" ").trim();

    let ballEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor('#141619')
    .addField('Question', question)
    .addField('Answer', replies[result]);

    message.channel.send(ballEmbed);
}

module.exports.help = {
    name: '8ball'
}