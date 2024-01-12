const { Client } = require("discord.js")
const client = new Client({ intents: [3276799]})

const config = require("./config.json")

client.login (config.token)
console.log("Bot is online")