const { readdirSync } = require("fs");

var self = (module.exports = {
	$commands: [],
	commands: [],

	init: async (client) => {
		if (!client.application?.owner) await client.application?.fetch();
		await client.application?.commands.set([]);
		await client.guilds.cache.get('523826876599500801')?.commands.set([]);

		let commandModules = readdirSync("./commands/", {
			withFileTypes: true,
		})
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

		for (mod of commandModules) {
			self.$commands = self.$commands.concat(readdirSync("./commands/" + mod, {
				withFileTypes: true,
			})
				.filter((dirent) => dirent.isDirectory())
				.map((dirent) => mod + '/' + dirent.name)
			)
		}

		for (dir of self.$commands) {
			let temp_require = require("../commands/" + dir);
			if (temp_require.config === null) continue;

			let perms = temp_require.config.permissions;
			if (perms === undefined) temp_require.config.permissions = [];
			if (perms.length > 0 && perms[0].id === null) {
				temp_require.config.permissions[0].id = client.application?.owner.id;
			}

			self.commands.push({
				config: temp_require.config,
				directory: '../commands/' + dir,
			})

			/*
			if (temp_require.config === null) continue;

			const newSlashCommand = await client.guilds.cache.get('523826876599500801')?.commands.create(temp_require.config.slash);
			
			// const newSlashCommand = await client.application?.commands.create(temp_require.config.slash);
			let perms = temp_require.config.permissions;
			if (perms === undefined) temp_require.config.permissions = [];
			if (perms.length > 0 && perms[0].id === null) {
				perms[0].id = client.application?.owner.id;
			}

			await newSlashCommand.setPermissions(temp_require.config.permissions);

			self.commands.push({
				directory: "../commands/" + dir,
				...temp_require.config,
				command: newSlashCommand,
			});
			*/
		}
		// console.log(self.commands.map(c => c.config))
		const newSlashCommand = await client.guilds.cache.get('523826876599500801')?.commands.set(self.commands.map(c => c.config.slash));
		// TODO permissions
		// console.log(newSlashCommand)

		// console.log(self.commands);

		return;
	},

	slashCommand: async (client, interaction) => {
		if (!client.application?.owner) await client.application?.fetch();

		let command = self.commands.filter((c) => c.config.slash.name === interaction.commandName)[0];

		// TODO: make permissions checker
		// if (command.permissions !== undefined) {
		// if (interaction.author.id !== command.config.permissions.id)
		require(command.directory).run(client, interaction, self);
		return;
	},

	reloadCommands: async (client) => {
		self.$commands = [];
		self.commands = [];
		await client.application?.commands.set([]);
		await client.guilds.cache.get('523826876599500801')?.commands.set([])
		
		self.init(client);
	},
	
	message: require('./message')
});
