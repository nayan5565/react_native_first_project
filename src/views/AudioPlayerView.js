import React, { useEffect, useRef, useState } from 'react';
import TrackPlayer, { State, Event, RepeatMode, usePlaybackState, useProgress, Capability, useTrackPlayerEvents } from 'react-native-track-player'
import Slider from '@react-native-community/slider'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { View, SafeAreaView, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import audio from '../constants/audio'
import styles from '../constants/GlobalStyle'

const { width, height } = Dimensions.get('window')

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer()

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
    const scrollx = useRef(new Animated.Value(0)).current;
    const [songIndext, setSongIndex] = useState(0)
    const songSlider = useRef(null)

    useEffect(() => {
        scrollx.addListener(({ value }) => {
            const index = Math.round(value / width)
            setSongIndex(index)
        });
        return () => { scrollx.removeAllListeners() }
    }, []);

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
                    <Image source={item.artwork} style={styless.artworkImg} />
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
                    <Text style={styless.title}>{audio[songIndext].title}</Text>
                    <Text style={styless.artist}>Artist</Text>
                </View>

                <View>
                    <Slider
                        style={styless.progressContainer}
                        value={10}
                        minimumValue={0}
                        maximumValue={100}
                        thumbTintColor="#FFD369"
                        minimumTrackTintColor='#FFD369'
                        maximumTrackTintColor='#FFF'
                        onSlidingComplete={() => { }}
                    />

                    <View style={styless.progressLabelContainer}>
                        <Text style={styless.progressLabelText}>0:00</Text>
                        <Text style={styless.progressLabelText}>3:55</Text>
                    </View>
                </View>

                <View style={styless.musicControll}>
                    <TouchableOpacity onPress={() => skipToPrevious()}>
                        <IonIcons name='play-skip-back-outline' size={30} color='#FFD369' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <IonIcons name='ios-pause-circle' size={60} color='#FFD369' />
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

                    <TouchableOpacity onPress={() => { }}>
                        <IonIcons name='repeat' size={30} color='#777777' />
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