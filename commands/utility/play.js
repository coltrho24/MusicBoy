const { SlashCommandBuilder } = require('discord.js');
const { Player, QueryType } = require('discord-player');

const play = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Place a song into the queue!")
    .addStringOption((option) => option
        .setName("music") // Option name is "music"
        .setDescription("Either the name, URL or playlist URL you want to play.")
        .setRequired(true));

module.exports = {
    data: play,
    async execute(interaction) {
        const player = Player.singleton();
        const channel = interaction.member.voice.channelId;
        if (!channel) return interaction.reply('You are not connected to a voice channel');
        
        // Retrieve the "music" option
        const query = interaction.options.getString('music', true);

        try {
            await interaction.deferReply();
            const search = await player.search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            });

            if (!search || !search.tracks.length) {
                return interaction.followUp('No results were found!');
            }

            const track = search.tracks[0];
            return interaction.followUp(`${track.title} has been added to the queue.`);
        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e.message}`);
        }
    }
};
