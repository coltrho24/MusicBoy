const {Events} = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client){
        console.log(`Swag, lets fucking go! ${readyClient.user.tag}`);
    },
};