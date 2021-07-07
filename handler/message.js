/*
	Handles messages
*/

var self = module.exports = {
	received: (client, message) => {
		console.log('got a message')
	},
	clean: (text) => {
		let temp_text = text;
		// actually remplace token later
		temp_text = temp_text.replace('token', '<silly>');
		return temp_text;
	},
	send: (channel, message) => {
		// clean n stuff
		let cleaned = self.clean(message);

		// lanuage stuff, later tho


		channel.send(cleaned);
	}
}