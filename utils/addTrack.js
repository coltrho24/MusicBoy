const { Player } = require('discord-player');

async function getQueue(interaction) {
    const player = interaction.client.player; // Ensure we use the correct player instance
    let queue = player.nodes.get(interaction.guild.id); // Use player.nodes.get() instead of player.getQueue()

    if (!queue) {
        queue = player.nodes.create(interaction.guild.id, {
            metadata: {
                channel: interaction.channel
            }
        });
    }

    if (!queue.connection) await queue.connect(interaction.member.voice.channel);

    return queue;
}

async function addTracks(interaction, nextSong, search, responseType) {
    try {
        let queue = await getQueue(interaction);

        if (nextSong) {
            queue.insertTrack(search.tracks[0]);
        } else {
            queue.addTrack(search.tracks[0]);
        }

        // Ensure queuePlay is implemented correctly or handle the play logic directly here
        await queuePlay(interaction, responseType, search, nextSong);
    } catch (err) {
        console.log(err);
        return interaction.followUp({ content: `failed to add the track(s) to the queue.`, ephemeral: true });
    }
}

module.exports = { getQueue,addTracks };
