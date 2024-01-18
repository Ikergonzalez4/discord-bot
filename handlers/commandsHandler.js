for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client.commands.set(command.name, command);

  const properties = { folder, ...commandFile };
  client.commands.set(commandFile.data.name, properties);
}
