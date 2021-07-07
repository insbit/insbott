const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const dotenv = require('dotenv').config();

const handler = require("./handler");

client.on("ready", async () => {
	console.log("Bot started");
	await handler.init(client);
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
	if (msg.author.bot) return;
	handler.message.received(client, msg);
});

client.on('interaction', interaction => {
	if (interaction.isCommand()) return handler.slashCommand(client, interaction);
});

client.login(process.env.TOKEN);
