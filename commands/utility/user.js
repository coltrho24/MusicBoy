const {SlashCommandBuilder} = require('discord.js');
const { execute } = require('./user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides the users information'),
    async execute(interaction){
        await interaction.reply(`This command was ran by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`);
    },
};