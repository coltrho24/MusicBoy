require("dotenv").config();
const { SlashCommandBuilder, Guild } = require("discord.js");
const { useQueue } = require("discord-player");

const stop = new SlashCommandBuilder()
	.setName("stop")
	.setDescription("Stops the queue!");

module.exports = {
	data: stop,
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
            queue.delete();
            await interaction.editReply(`Stopped the queue`);
		} catch (e) {
			return interaction.followUp(`Something went wrong: ${e.message}`);
		}
	},
};