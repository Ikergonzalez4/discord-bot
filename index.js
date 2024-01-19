const { Client, GatewayIntentBits, Partials } = require("discord.js");

const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents } = require("./Handlers/eventHandler.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");

client.login(client.config.token).then(() => {
    loadEvents(client);
});