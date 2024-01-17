// /src/functions/greetings/hello.js

const greet = (client) => {
    client.on('message', message => {
        if (message.content.startsWith('!hello') || message.content.startsWith('!hi') || message.content.startsWith('!hey')) {
            message.reply(`Hello, I'm ${client.user.tag} and I am created by Iker Gonzalez`);
        }
    });
};

module.exports = {
    name: "greeting",
    aliases: ["hi", "hey"],
    desc: "Greeting when the user says hello",
    greet};