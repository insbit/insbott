var self = module.exports = {
	config: {
		name: '',
		description: '',
		options: [{
			name: '',
			type: '',
			description: '',
			required: false,
		}],
	},

	run: (client, data) => {
		data.reply({ content: 'hi', ephemeral: true })
	}
}
