const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  entersState,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const YouTube = require("youtube-sr").default;

async function playMusic(message, songName) {
  const connection = joinVoiceChannel({
    channelId: message.member.voice.channel.id,
    guildId: message.guild.id,
    adapterCreator: message.guild.voiceAdapterCreator,
  });

  const video = await YouTube.search(songName, { limit: 1 });

  if (video[0]) {
    const stream = video[0].url;
    const resource = createAudioResource(stream);
    const player = createAudioPlayer();

    player.play(resource);

    player.on("idle", () => {
      connection.destroy();
    });

    connection.subscribe(player);

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    } catch (error) {
      connection.destroy();
      return;
    }
  } else {
    message.reply("No se encontró el video.");
  }
}

module.exports = playMusic;
