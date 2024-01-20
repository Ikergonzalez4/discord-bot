const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    run: async (client, message, args) => {
        if (!message.member.roles.cache.some(role => role.name === 'ADMIN')) {
            return message.reply('You need to have the **ADMIN** role to use this command.');
        }
        message.channel.send('Pong!');
    },
};