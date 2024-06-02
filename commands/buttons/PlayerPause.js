const PlayerHandler = require("../../PlayerHandler");
module.exports = {
    data: PlayerPause,
	async execute(interaction) {
		await PlayerHandler.pauseGuildPlayer(interaction);
	}
}
