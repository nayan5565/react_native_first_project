import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import TrackPlayer, { State, Event, RepeatMode, usePlaybackState, useProgress, Capability, useTrackPlayerEvents } from 'react-native-track-player'
import Slider from '@react-native-community/slider'
import { Searchbar } from 'react-native-paper';

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer()
}
const initialList = [];

function PickFileView(props) {
    const progress = useProgress()
    const [audioPlay, setAudioPlay] = useState(false)
    const [list, setList] = useState([]);

    useEffect(() => {
        setupPlayer()

        // return () => {

        //     TrackPlayer.destroy()
        // }
    }, []);



    const pickSignleFile = async () => {
        // Pick a single file
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.audio],
            });
            var track = {
                url: res.uri,
                title: res.name,
                artist: res.type,
            };
            await TrackPlayer.add([track]);
            await TrackPlayer.play()
            setAudioPlay(true)
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const pickMultipleFile = async () => {
        // Pick multiple files
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.audio],
            });

            for (const res of results) {
                var track = {
                    url: res.uri,
                    title: res.name,
                    artist: res.type,
                };

                initialList.push(track)


                console.log(
                    res.uri,
                    res.type, // mime type
                    res.name,
                    res.size
                );
            }
            setList(initialList);
            console.log('list==>', list.length)
            await TrackPlayer.add(initialList);
            await TrackPlayer.play()
            setAudioPlay(true)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const ChildView = (title, subTitle) => {
        return (
            <View style={{ backgroundColor: 'gray', padding: 10, margin: 5, flex: 100, flexDirection: 'row' }}>

                <View style={{ flex: 80, justifyContent: 'center', }}>
                    <Text style={{ color: 'white' }}>{title}</Text>
                    <Text style={{ color: 'white' }}>{subTitle}</Text>
                </View>

            </View>
        )
    }

    const BuildListView = () => {
        return (
            <FlatList data={initialList} renderItem={({ item }) => ChildView(item.url, item.title)} />
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: '70%' }}>

                <Button title='Pick single file' onPress={() => pickSignleFile()} />
                <Button title='Pick multiple file' onPress={() => pickMultipleFile()} />
                <BuildListView />
            </View>
            {audioPlay ? <Slider
                style={styless.progressContainer}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                thumbTintColor="#FFD369"
                minimumTrackTintColor='#FFD369'
                maximumTrackTintColor='teal'
                onSlidingComplete={async (value) => { await TrackPlayer.seekTo(value) }}
            /> : null}
        </View>
    );
}

export default PickFileView;

const styless = StyleSheet.create({

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