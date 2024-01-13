const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
    if (message.content.startsWith('!help')) {
        const helpText = `
        ## Aquí están los comandos que puedes usar:

        \`\`\`
        >hello - Responds with a greeting |  >sum <num1> <num2> - Sums two numbers
        >rest <num1> <num2> - rest two numbers |>mult <num1> <num2> - mult two numbers
        >div <num1> <num2> - div two numbers
        \`\`\`
        `;
        message.channel.send(helpText);
    }
});

client.login(process.env.DISCORD_TOKEN);