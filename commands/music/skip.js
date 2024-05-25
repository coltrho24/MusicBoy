require("dotenv").config();
const { SlashCommandBuilder, Guild } = require("discord.js");
const { useQueue } = require("discord-player");

const skip = new SlashCommandBuilder()
	.setName("skip")
	.setDescription("Skips the song!");

module.exports = {
	data: skip,
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
            queue.node.skip();
            await interaction.editReply(`Skipped the current song`);
		} catch (e) {
			return interaction.followUp(`Something went wrong: ${e.message}`);
		}
	},
};