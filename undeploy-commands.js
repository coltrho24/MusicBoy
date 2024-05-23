require("dotenv").config();
const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");

(async () => {
	try {
		console.log(`Started revoking all commands.`);
		const rest = new REST().setToken(token);
		await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
		console.log(`Successfully revoked commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
