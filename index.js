const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const request = require("request");
const { token } = require("./config.json");
// const handler = require("./handler");

client.on("ready", async () => {
	console.log("Bot started");
	// await handler.init(client);
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
	if (msg.author.bot) return;
	// handler.message.received(client, msg);
});

client.on('interactionCreate', async (interaction) => {
	// if (interaction.isCommand()) return handler.slashCommand(client, interaction);

	if (interaction.isMessageContextMenu()) {
		console.log('Message context menu');

		let msg = client.channels.cache.get(interaction.channelId).messages.cache.get(interaction.targetId);
		console.log(msg)
		interaction.reply(msg.content)
		/*
		request({
			url: 'http://localhost:5000/translate',
			method: "POST",
			body: JSON.stringify({
				q: "Hello!",
				source: "en",
				target: "es"
			}),
			headers: { "Content-Type": "application/json" }
		}, (e, r, b) => {
			console.log(r);
			interaction.reply("")
		});
		*/
	}
});

client.login(token);
