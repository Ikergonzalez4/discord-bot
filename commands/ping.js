const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!")
        .setDefaultPermissions(PermissionFlagsBits.Administrator), // only admins can use this command
    execute(interaction) {
        interaction.reply({content: "Pong!", ephermal:});
    }
};