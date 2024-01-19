const { Client, GatewayIntentBits, Partials  } = require ("discord.js");

const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
    intents: [ Guilds, GuildMembers, GuildMessages ],
    partials: [ User, Message, GuildMember, ThreadMember ], 
});

client.once("ready", () => {
    console.log(botname + " is online!");
});

client.config = require("./config.json");

client.login(client.config.token);