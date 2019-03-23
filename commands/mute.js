const Discord = require('discord.js');
const ms = require('ms');

// TO DO: 1) Add !Unmute, Delete Arguments with just spaces ' '. 2) if you don`t specify a time set it to a default. 3) Create an Embed in incidents

module.exports.run = async (client, message, arguments) => {
    await message.delete(); // Delete the command
    if (message.member.hasPermission(['MUTE_MEMBERS'])) { // Has permission to mute users
            let muteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
            if (!muteUser) return message.reply('Cound´t find user');
            if (muteUser.hasPermission(['MUTE_MEMBERS'])) return message.reply('Can´t mute them!');
            let muteRole = message.guild.roles.find(`name`, 'muted');
            // Create mute role
            if (!muteRole) {
                try {
                    muteRole = await message.guild.createRole({
                        name: 'muted',
                        color: '#000000',
                        permissions:[]
                    })
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(muteRole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });
                } catch(e) {
                    console.log(e.stack);
                }
            }
            // Set mute time
            let muteTime = arguments[1];
            if (!muteTime) return message.reply('You didn´t specify a time!');

            await(muteUser.addRole(muteRole.id));
            message.reply(`<@${muteUser.id}> has been muted for ${ms(ms(muteTime))}`);

            // Remove mute role
            setTimeout(function() {
                muteUser.removeRole(muteRole.id);
                message.channel.send(`<@${muteUser.id}> has been unmuted!`);
            }, ms(muteTime));

    } else {
        message.channel.send('sorry can´t mute other people!')
    }
}

module.exports.help = {
    name: 'mute'
}