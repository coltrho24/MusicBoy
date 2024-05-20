const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Events, GatewayIntentBits} = require("discord.js");
//const {Player, QueryType} = require("discord-player");
const {token} = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        //GatewayIntentBits.GuildMessages, 
        //GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'SlashCommands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);

// const player = new Player(client);

// player.on("error", (queue, error) =>
// {
//     console.log('[${queue.guild.name)] Error emitted from the queue: ${error.message}');
// });

// player.on("connectionError", (queue, error) => 
// {
//     console.log('[${queue.guild.name}] Error emitted from the connections: ${error.meesage}');
// });

// player.on("trackStart", (queue, track) =>
// {
//     queue.metadata.send('Playing: **${track.title}**');
// });

// player.on("trackAdd", (queue, track) =>
// {
//     queue.metadata.send('Track **${track.title}** queued');
// });

// player.on("botDisconnect", (queue) =>
// {
//     queue.metadata.send("Left Channel");
// });

// player.on("queueEnd", (queue) =>
// {
//     queue.metadata.send("Queue ended");
// });

// client.on('messageCreate', async message => {
//     if (message.author.bot || !message.guild) return;
//     if (!client.application?.owner) await client.application?.fetch();

//     if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
//         await message.guild.commands
//             .set(client.commands)
//             .then(() => {
//                 message.reply('Deployed!');
//             })
//             .catch(err => {
//                 message.reply('Could not deploy commands! Make sure the bot has the application.commands permission!');
//                 console.error(err);
//             });
//     }
// });