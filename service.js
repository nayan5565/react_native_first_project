import TrackPlayer from 'react-native-track-player';
module.exports = async function () {

    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-skipToNext', () => TrackPlayer.skipToNext());
    TrackPlayer.addEventListener('remote-skipToPrevious', () => TrackPlayer.skipToPrevious());

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

    // ...

};