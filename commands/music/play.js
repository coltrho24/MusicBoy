require("dotenv").config();
const musicFuncs = require('../../utils/sharedFuncs.js')
const {SlashCommandBuilder} = require('discord.js');
const { Player, QueryType } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Place a song into the queue!")
        .addStringOption((option) => option
            .setName("music")
            .setDescription("Either the name, URL or playlist URL you want to play.")
            .setRequired(true)
        ),
    async execute(interaction) {
        const query = interaction.options.getString("music");
        const player = Player.singleton();
        await musicFuncs.getQueue(interaction);

        const search = await player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })
        
        //console.log(search)
        if (!search || search.tracks.length == 0 || !search.tracks) {
            return interaction.reply({ content: `couldn't find the song with the requested query.`, ephemeral: true })
        }

        //Otherwise it has found so defer reply
        await interaction.deferReply();
        await musicFuncs.addTracks(interaction, 'false', search, 'send')
    }
}