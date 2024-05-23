require("dotenv").config();
const { SlashCommandBuilder, Guild } = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");
const stop = new SlashCommandBuilder()
	.setName("stop")
	.setDescription("Stops the queue!");

module.exports = {
	data: stop,
	async execute(interaction) {
		try {
            //when you have time, to understand why we use it
            //Read this https://discordjs.guide/slash-commands/response-methods.html#deferred-responses 
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
            //this below part is so that no one not in the same voice channel as the bot can control the bot
            //that is something i decided to do so that my friends cant stop it
            //you can decide to remove it if you want
			// if (
			// 	interaction.guild.members.me.voice.channelId &&
			// 	interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
			// ) {
			// 	await interaction.editReply({
			// 		content: "You are not in my voice channel!",
			// 		ephemeral: true,
			// 	});
			// 	return;
			// }

            //its gonna take me a min to figure out the stop, so give me a little bit
            //take your time, refer to the common actions page in the guide, its specifically for this
            //https://discord-player.js.org/guide/examples/common-actions
            //got it pulled up

            //im gonna try and run this, its okay if it breaks, just part of the process
            const queue = useQueue(interaction.guild.id);
            queue.delete();
            await interaction.editReply(`Stopped the queue!`);
		} catch (e) {
			return interaction.followUp(`Something went wrong: ${e.message}`);
		}
	},
};
