import React, { useEffect, useRef, useState } from 'react';
import TrackPlayer, { State, Event, RepeatMode, usePlaybackState, useProgress, Capability, useTrackPlayerEvents } from 'react-native-track-player'
import Slider from '@react-native-community/slider'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, SafeAreaView, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import audio from '../constants/audio'
import styles from '../constants/GlobalStyle'
import { secondsToHms2 } from '../helper/helperFunction';
import { event } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window')

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer()
    await TrackPlayer.updateOptions(
        {
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop
            ],
        }
    )

    await TrackPlayer.add(audio);

}

const togglePlaback = async (playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack()

    if (currentTrack !== null) {
        if (playbackState === State.Paused) {
            await TrackPlayer.play()
        } else {
            await TrackPlayer.pause()
        }
    }
}


const AudioPlayerView = () => {
    const playbackState = usePlaybackState()
    const progress = useProgress()

    const scrollx = useRef(new Animated.Value(0)).current;
    const [songIndext, setSongIndex] = useState(0)
    const [repeatMode, setRepeatMode] = useState('off')
    const [title, setTitle] = useState(0)
    const [artwork, setArtwork] = useState(0)
    const [artist, setArtist] = useState(0)
    const songSlider = useRef(null)

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const { title, artist, artwork } = track;
            setArtist(artist)
            setArtwork(artwork)
            setTitle(title)
        }
    })

    const repeatIcon = () => {
        if (repeatMode === 'off') {
            return 'repeat-off'
        } else if (repeatMode === 'track') {
            return 'repeat-once'
        } else if (repeatMode === 'repeat') {
            return 'repeat'
        }
    }

    const changeRepeatMode = () => {
        if (repeatMode === 'off') {
            TrackPlayer.setRepeatMode(RepeatMode.Track)
            setRepeatMode('track')
        } else if (repeatMode === 'track') {
            TrackPlayer.setRepeatMode(RepeatMode.Queue)
            setRepeatMode('repeat')
        } else if (repeatMode === 'repeat') {
            TrackPlayer.setRepeatMode(RepeatMode.Off)
            setRepeatMode('off')
        }
    }

    useEffect(() => {
        setupPlayer()
        scrollx.addListener(({ value }) => {
            const index = Math.round(value / width)
            skipTo(index)
            setSongIndex(index)
        });
        return () => {
            scrollx.removeAllListeners()
            TrackPlayer.destroy()
        }
    }, []);

    const skipTo = async (trackId) => {
        await TrackPlayer.skip(trackId)
    }

    const skipToNext = () => {
        // songSlider.current.scrollToOffset({
        //     offset: (setSongIndex + 1),
        // })
        if (songIndext < audio.length - 1) {
            songSlider.current.scrollToIndex({
                animated: true,
                index: songIndext + 1
            })
        }
    }

    const skipToPrevious = () => {
        if (songIndext > 0) {
            songSlider.current.scrollToIndex({
                animated: true,
                index: songIndext - 1
            })
        }
    }

    const renderSongs = ({ index, item }) => {
        return (
            <Animated.View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styless.artworkWrapper}>
                    <Image source={artwork} style={styless.artworkImg} />
                </View>
            </Animated.View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                {/* <View style={styless.artworkWrapper}>
                    <Image source={require('../assets/images/banner.png')} style={styless.artworkImg} />
                </View> */}
                <View style={{ width: width }}>
                    <Animated.FlatList
                        ref={songSlider}
                        data={audio}
                        renderItem={renderSongs}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: { x: scrollx }
                                }
                            }],
                            { useNativeDriver: true }
                        )}
                    />
                </View>

                <View>
                    <Text style={styless.title}>{title}</Text>
                    <Text style={styless.artist}>{artist}</Text>
                </View>

                <View>
                    <Slider
                        style={styless.progressContainer}
                        value={progress.position}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        thumbTintColor="#FFD369"
                        minimumTrackTintColor='#FFD369'
                        maximumTrackTintColor='#FFF'
                        onSlidingComplete={async (value) => { await TrackPlayer.seekTo(value) }}
                    />

                    <View style={styless.progressLabelContainer}>
                        <Text style={styless.progressLabelText}>{secondsToHms2(progress.position)}</Text>
                        <Text style={styless.progressLabelText}>{secondsToHms2(progress.duration - progress.position)}</Text>
                    </View>
                </View>

                <View style={styless.musicControll}>
                    <TouchableOpacity onPress={() => skipToPrevious()}>
                        <IonIcons name='play-skip-back-outline' size={30} color='#FFD369' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => togglePlaback(playbackState)}>
                        <IonIcons name={playbackState === State.Playing ? 'ios-pause-circle' : 'ios-play-circle'} size={60} color='#FFD369' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => skipToNext()}>
                        <IonIcons name='play-skip-forward-outline' size={30} color='#FFD369' />
                    </TouchableOpacity>
                </View>

                {/* <View>
                    <Text>{songs[songIndext].title}</Text>
                    <Text>{songs[songIndext].artist}</Text>
                </View> */}



            </View>

            <View style={styless.bottomContainer}>
                <View style={styless.bottomControls}>
                    <TouchableOpacity onPress={() => { }}>
                        <IonIcons name='heart-outline' size={30} color='#777777' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => changeRepeatMode()}>
                        <MaterialCommunityIcons name={repeatIcon()} size={30} color={repeatMode !== 'off' ? '#FFD369' : '#777777'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <IonIcons name='share-outline' size={30} color='#777777' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <IonIcons name='ellipsis-horizontal' size={30} color='#777777' />
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
}

export default AudioPlayerView;

const styless = StyleSheet.create({
    bottomContainer: {
        borderTopColor: '#393E46',
        borderTopWidth: 1,
        width: width,
        alignItems: 'center',
        paddingVertical: 15
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    artworkWrapper: {

        width: 250,
        height: 240,
        marginBottom: 25,
        shadowColor: '#FFF',
        shadowOpacity: 0.5,
        shadowRadius: 3.8,
        shadowOffset: {
            width: 5,
            height: 5
        },
        elevation: 5
    },
    artworkImg: {

        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    artist: {
        fontSize: 16,
        fontWeight: '200',
        textAlign: 'center',
        color: '#EEEEEE'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EEEEEE'
    },
    progressContainer: {
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row'
    },
    progressLabelContainer: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressLabelText: {

        color: '#FFF'
    },
    musicControll: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        marginTop: 15
    }

});