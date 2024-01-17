// Importar módulos
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { sum, subtract, multiply, divide } = require('./commands/Math/calcs.js');
const getSubscriberCount = require('./commands/YouTube/youtube_subs.js');
const playMusic = require('./commands/Music/music.js');
const welcome = require('./commands/Welcome/welcome.js');
const helpCommand = require('./commands/Info/help.js');

// Crear cliente
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Comandos
const commands = {
    '!ping': message => message.reply('Pong'),
    '!hello': message => message.reply(`Hello, I'm ${client.user.tag} and I am created by Iker Gonzalez`),
    '!hey': message => message.reply(`Hello, I'm ${client.user.tag} and I am created by Iker Gonzalez`),
    '!hi': message => message.reply(`Hello, I'm ${client.user.tag} and I am created by Iker Gonzalez`),
    '!help': helpCommand,
    '!sum': (message, args) => sum(parseInt(args[1]), parseInt(args[2]), message),
    '!subtract': (message, args) => subtract(parseInt(args[1]), parseInt(args[2]), message),
    '!multiply': (message, args) => multiply(parseInt(args[1]), parseInt(args[2]), message),
    '!divide': (message, args) => divide(parseInt(args[1]), parseInt(args[2]), message),
    '!subs': async (message, args) => {
        const channel = args[1];
        const subscriberCount = await getSubscriberCount(channel);
        message.reply(`El canal ${channel} tiene ${subscriberCount} suscriptores`);
    },
    '!play': async (message, args) => {
        if (!message.guild) return;
        const songName = args.slice(1).join(' ').trim();
        playMusic(message, songName);
    },
};

// Eventos
client.on('ready', () => {
    console.log(`¡Hola! Soy ${client.user.tag}, y ya estoy aquí`);
    welcome(client);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const args = message.content.split(' ');
    const command = args[0].toLowerCase();

    if (commands[command] && typeof commands[command] === 'function') {
        commands[command](message, args);
    }
});

client.login(process.env.DISCORD_TOKEN);