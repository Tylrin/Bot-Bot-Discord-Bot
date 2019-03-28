const Discord = require('discord.js');
const config = require('./config.json');
const botConfig = require('./config.bot.json');
const fs = require('fs');

const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => { // Check the file direktory for console commands
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() == 'js');
    if(jsfile.length <= 0) {
        console.log('Cound´t find commands');
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded`);
        client.commands.set(props.help.name, props);
    });
});

client.once('ready', () => { // Initialize Bot
    console.log(`${client.user.username} is online!`);
    client.user.setActivity('source code', {type: 'WATCHING'}); // Set Bots activity
});

client.on('guildMemberAdd', async member => { // On member added
    console.log(`${member.id} joined the server`);
    let welcomeChannel = member.guild.channels.find(`name`, 'welcome')
    if (!welcomeChannel) return message.channel.send('Couldn´t find welcome channel');
    welcomeChannel.send(`Hey everyone! ${member} joined the channel`)
});

client.on('guildMemberRemove', async member => { // On member removed
    console.log(`${member.id} left the server`);
    let welcomeChannel = member.guild.channels.find(`name`, 'welcome')
    if (!welcomeChannel) return message.channel.send('Couldn´t find welcome channel');
    welcomeChannel.send(`Hey everyone! ${member} left the channel`)
});

client.on('message', message => { // On all messages
    console.log(message.content);
    if (message.author == client.user) { // Prevent bot from responding to its own messages
        return;
    }

    if (message.content.startsWith(botConfig.prefix)) { // It will listen for messages that will start with the set prefix
        processCommand(message);
    }
});

function processCommand(message) {
    let messageContent = message.content.toLowerCase() // Transforming the text to lower case
    let fullCommand = messageContent.substr(1) // Remove the leading prefix mark
    let splitCommand = fullCommand.split(' ') // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the prefix is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command 

    console.log('Command : ' + primaryCommand);
    console.log('Arguments: ' + arguments);

    let commandfile = client.commands.get(primaryCommand); // Get the command file
    if (commandfile) {
        commandfile.run(client, message, arguments); // If the file exists, call it
    } else {
        message.channel.send(`The command ${primaryCommand} doesn´t exist`); // Notify if the command doesn´t exist
    }
};

client.login(config.token);