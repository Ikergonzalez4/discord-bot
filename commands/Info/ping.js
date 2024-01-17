module.exports = {
    name: "ping",
    aliases: ["lat", "ms"],
    desc: "Ping to the bot",
    run: async (client, message, args, prefix) => {
        message.reply(`Pong! The bot ping is \`${client.ws.ping}ms\``)
    }
}