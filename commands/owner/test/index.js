var self = module.exports = {
	config: {
		slash: {
			name: 'test',
			description: 'Test the bot',
		},
		permissions: [],
	},

	run: (client, data) => {
		data.reply({ content: 'test complete', ephemeral: true })
	}
}
