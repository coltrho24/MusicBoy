const {Client, Events, GatewayIntentBits} = require("discord.js");
//const {Player, QueryType} = require("discord-player");
const {token} = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        //GatewayIntentBits.GuildMessages, 
        //GatewayIntentBits.GuildVoiceStates
    ]
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Swag, lets fucking go! ${readyClient.user.tag}`);
});

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