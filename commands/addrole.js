const Discord = require('discord.js');

module.exports.run = async (client, message, arguments) => {
    await message.delete(); // Delete the command
    if (message.member.hasPermission(['MANAGE_ROLES'])) { // Has permission to add roles
        let roleUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
        if (!roleUser) return message.reply('Cound´t find user');
        let role = arguments.join('').slice(22);
        if (!role) return message.reply('Specify a role!');
        let guildRole = message.guild.roles.find(`name`, role);
        if (!guildRole) return message.reply('Cound´t find that role');

        if(roleUser.roles.has(guildRole.id)) return message.reply('They already have that role');
        await(roleUser.addRole(guildRole.id));

        try {
            await roleUser.send(`Congrats, you have been given the role ${guildRole.name}`);
        } catch(e) {
            message.channel.send(`Congrats to <@${roleUser.id}> been given the role ${guildRole.name}. We tried to DM them, but their DMs are locked.`);
        }

    } else {
        message.channel.send('sorry you don´t have the permissions to do that')
    }
}

module.exports.help = {
    name: 'addrole'
}