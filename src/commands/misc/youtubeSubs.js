const { SlashCommandBuilder } = require("discord.js");
const axios = require('axios');

function formatSubsCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    } else {
        return count.toString();
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("subs")
        .setDescription("Get the number of subscribers of a YouTube channel.")
        .addStringOption((o) =>
            o.setName("channel")
             .setDescription("The name of the YouTube channel.")
             .setRequired(true)
        )
        .toJSON(),
    userPermissions: [],
    botPermissions: [],

    run: async (client, interaction) => {
        const channelName = interaction.options.get('channel').value;
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=${channelName}&key=AIzaSyBV7AHayM0ygKqgvlz-G0SlEcL9Lki41J8`);
        const subsCount = response.data.items[0].statistics.subscriberCount;
        const formattedSubsCount = formatSubsCount(subsCount);
        await interaction.reply(`The channel ${channelName} has ${formattedSubsCount} subscribers.`);
    },
};