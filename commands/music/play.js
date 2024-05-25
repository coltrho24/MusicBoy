require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const { useMainPlayer } = require("discord-player");

const play = new SlashCommandBuilder()
	.setName("play")
	.setDescription("Place a song into the queue!")
	.addStringOption((option) =>
		option
			.setName("music") // Option name is "music"
			.setDescription("Either the name, URL or playlist URL you want to play.")
			.setRequired(true),
	);

module.exports = {
	data: play,
	async execute(interaction) {
		try {
			await interaction.deferReply();
			const player = useMainPlayer();
			//adding basic checks before we start playing below
			if (!interaction.member || !interaction.member.voice.channel) {
				await interaction.editReply({
					content: "You are not in a voice channel!",
					ephemeral: true,
				});
				return;
			}
			if (
				interaction.guild.members.me.voice.channelId &&
				interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
			) {
				await interaction.editReply({
					content: "You are not in my voice channel!",
					ephemeral: true,
				});
				return;
			}

			const query = interaction.options.getString("music");
			const searchResult = await player.search(query, { requestedBy: interaction.user });
			if (!searchResult.hasTracks()) {
				await interaction.editReply(`We found no tracks for ${query}!`);
				return;
			}
			await player.play(interaction.member.voice.channel, searchResult, {
				nodeOptions: {
					metadata: interaction.channel,
					bufferingTimeout: 15000, //all these stuff are my config that you can tinker with later
					leaveOnStop: true,
					leaveOnStopCooldown: 5000,
					leaveOnEnd: true,
					leaveOnEndCooldown: 15000,
					leaveOnEmpty: true,
					leaveOnEmptyCooldown: 30000,
					skipOnNoStream: true,
				},
				requestedBy: interaction.user,
			});
            await interaction.editReply(`Added ${searchResult.tracks[0].title} to the queue!`);
		} catch (e) {
			return interaction.followUp(`Something went wrong: ${e.message}`);
		}
	},
};
