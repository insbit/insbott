var self = (module.exports = {
	config: {
		slash: {
			name: "reload",
			description: "reloads all commands",
			defaultPermission: false
		},
		permissions: [
			{
				id: '523826395801976842',
				type: "USER",
				permission: true,
			},
		],
	},

	run: (client, data, handler) => {
		console.log('reloading commands')
		data.reply({ content: "Reloading commands", ephemeral: true });
		handler.reloadCommands(client);
	},
});
