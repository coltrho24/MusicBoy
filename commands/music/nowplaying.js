require("dotenv").config();
const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, Guild } = require("discord.js");
const { useQueue, usePlayer } = require("discord-player");
const { config } = require("dotenv");

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

			const butttonLabelList = [
				{ key: "PlayerQueue", value: "Current Queue", style: ButtonStyle.Primary },
				{ key: "PlayerPrevious", value: "⏮️ Previous", style: ButtonStyle.Secondary },
				{ key: "PlayerPause", value: "⏯️ Toggle Pause", style: ButtonStyle.Secondary },
				{ key: "PlayerSkip", value: "⏭️ Skip", style: ButtonStyle.Secondary },
				{ key: "PlayerStop", value: "⏹️ Stop", style: ButtonStyle.Danger },
			];

			const buttonRow = new ActionRowBuilder();
			for (let i = 0; i < butttonLabelList.length; i++) {
				buttonRow.addComponents(
					new ButtonBuilder()
						.setCustomId(butttonLabelList[i].key)
						.setLabel(butttonLabelList[i].value)
						.setStyle(butttonLabelList[i].style),
				);
			}

            const tracks = queue.tracks.toArray();
            const currentTrack = queue.currentTrack;
			const nowPlayingEmbed = new EmbedBuilder()
				.setColor(0x6fa8dc)
				.setTitle("Now Playing")
				.setAuthor({
					name: interaction.member.guild.name,
					iconURL: interaction.guild.iconUrl ? interaction.guild.iconUrl : config.botpfp,
					url: config.botWebsite,
				})
				.setThumbnail(currentTrack.thumbnail)
				.setDescription(currentTrack.description)
				.setTimestamp();
			await interaction.followUp({
				embeds: [nowPlayingEmbed],
				components: [buttonRow],
			});
		} catch (e) {
			return interaction.followUp(`Something went wrong: ${e.message}`);
		}
	},
};
