env = require('dotenv').config();   //Importar dotenv
const Discord = require('discord.js');      //Importar discord.js
const { Client, GatewayIntentBits } = require('discord.js');     //Que se necesite discord.js para eso
const { sum, subtract, multiply, divide } = require('./src/functions/calcs/calcs.js');
const axios = require('axios');
const getSubscriberCount = require('./src/functions/yt/youtube_subs.js');
const playMusic = require('./src/functions/yt/music.js');

const client = new Discord.Client({   //Intentos y cliente nuevo
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('ready', () => {      
    console.log(`¡Hola! Soy ${client.user.tag}, y ya estoy aquí`);
});

client.on('messageCreate', async message => { 
    // ping
    if (message.author.bot) {   //Si el autor es un bot
        return;   //No hacer nada
    }
    if ((message.content) == '!ping') {    //Si el mensaje es "ping"
        message.reply ('Pong')    //Decir "Pong"
    }

    // greetings
    if (message.content.startsWith('!hello') || message.content.startsWith('!hey') || message.content.startsWith('!hi')) {
        message.reply(`Hello, I'm ${client.user.tag} and I am created by Iker Gonzalez`);    //Saludar al usuario
    }

    // calcs 
    const args = message.content.split(' ');
    const command = args[0].toLowerCase();

    if (command === '!sum') {
        const num1 = parseInt(args[1]);
        const num2 = parseInt(args[2]);
        sum(num1, num2, message);
    } else if (command === '!subtract') {
        const num1 = parseInt(args[1]);
        const num2 = parseInt(args[2]);
        subtract(num1, num2, message);
    } else if (command === '!multiply') {
        const num1 = parseInt(args[1]);
        const num2 = parseInt(args[2]);
        multiply(num1, num2, message);
    } else if (command === '!divide') {
        const num1 = parseInt(args[1]);
        const num2 = parseInt(args[2]);
        divide(num1, num2, message);
    }

    // yt subs 
    if (command === '!subs') {
        const channel = args[1];
        const subscriberCount = await getSubscriberCount(channel);
        message.reply(`El canal ${channel} tiene ${subscriberCount} suscriptores`);
    }

    //music
    client.on('messageCreate', async message => {
        if (!message.guild) return;
        if (!message.content.startsWith('!play')) return;
    
        const songName = message.content.slice('!play'.length).trim();
        playMusic(message, songName);
    });
});

client.login(process.env.DISCORD_TOKEN);