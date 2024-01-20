const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    let eventName;
    eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    eventName === "validations" ? (eventName = "interactionCreate") : eventName;

    client.on(eventName, async (interaction) => {
      // Check if the interaction is a slash command interaction
      if (interaction.isCommand && interaction.isCommand()) {
        // Check if the user has the 'verified' or 'ADMIN' role
        if (!interaction.member.roles.cache.some(role => role.name === 'verified' || role.name === 'ADMIN')) {
          return interaction.reply('You must have the verified role to use commands.');
        }
      }

      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, interaction);
      }
    });
  }
};