// make ContextMenu for messages
const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const menues = [
	new ContextMenuCommandBuilder().setName("translate").setType(3)
]
	.map(menu => menu.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: menues })
	.then(() => console.log('Successfully registered application menues.'))
	.catch(console.error);