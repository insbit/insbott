var self = module.exports = {
	config: {
		slash: {
			name: 'help',
			description: 'The help command',
			options: [{
				name: 'command',
				type: 'STRING',
				description: 'Help for the specified command',
				required: false,
			}],
		},
		permissions: [],
	},

	run: (client, data) => {
		data.reply('help message not created yet')
	}
}
