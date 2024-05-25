require("dotenv").config();
const { SlashCommandBuilder, Guild } = require("discord.js");
const { useQueue } = require("discord-player");

const shuffle = new SlashCommandBuilder()
	.setName("shuffle")
	.setDescription("Shuffles the songs");

module.exports = {
	data: shuffle,
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
            queue.tracks.shuffle();
            await interaction.editReply(`Shuffled the queue/playlist`);
		} catch (e) {
			return interaction.followUp(`Something went wrong: ${e.message}`);
		}
	},
};