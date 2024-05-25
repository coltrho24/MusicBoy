require("dotenv").config();
const { SlashCommandBuilder, Guild } = require("discord.js");
const { useQueue } = require("discord-player");

const nowplaying = new SlashCommandBuilder()
	.setName("nowplaying")
	.setDescription("Shows the title of the current song");

module.exports = {
	data: nowplaying,
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
		try {
			await interaction.deferReply(); 
			//adding basic checks before we start playing below
			if (!interaction.member || !interaction.member.voice.channel) {
				await interaction.editReply({
					content: "You are not in a voice channel!",
					ephemeral: true,
				});
				return;
			}
            const tracks = queue.tracks.toArray();
            const currentTrack = queue.currentTrack;
            await interaction.editReply(`Now playing ${currentTrack.description}`);
		} catch (e) {
			return interaction.followUp(`Something went wrong: ${e.message}`);
		}
	},
};
