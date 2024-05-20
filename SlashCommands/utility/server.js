const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server'),
    async execute(interaction){
        await interaction.reply(`This command tells the user how old ${interaction.guild.name} is ${interaction.guild.age}`);
    },
};