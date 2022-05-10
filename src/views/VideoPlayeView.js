import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Video, { FilterType } from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import imagePath from '../constants/imagePath'


const VideoPlayeView = (props) => {
    const videoRef = useRef(null)
    const [filterType, setFilterType] = useState(FilterType.SEPIA)
    const [external, setExternal] = useState(false)
    const [android, setAndroid] = useState(false)

    const changeFilter = (filter) => {
        setFilterType(filter)
    }

    const onBuffer = (e) => {
        console.log('buffer===>', e)
    }

    const onError = (e) => {
        console.log('error===>', e)
    }

    useEffect(() => {
        console.log('VideoRef===>', videoRef)
    }, [])

    // better for ios
    const VideoPlayerIos = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Video
                    source={external ? imagePath.video : { uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}   // Can be a URL or a local file.
                    poster='https://baconmockup.com/300/200/'
                    posterResizeMode='cover'
                    onBuffer={onBuffer}
                    onError={onError}
                    ref={videoRef}
                    style={styles.backgroundVideo}
                    controls
                    repeat
                    filterEnabled={true}
                    filter={filterType}
                    resizeMode='contain'
                />
                <View style={styles.filterView}>
                    <Button title='Mono' onPress={() => changeFilter(FilterType.MONO)} />
                    <Button title='Sepia' onPress={() => changeFilter(FilterType.SEPIA)} />
                    <Button title='Chrome' onPress={() => changeFilter(FilterType.CHROME)} />
                    <Button title={external ? 'Play Online' : 'Play Local'} onPress={() => { setExternal(!external) }} />
                    <Button title='Android' onPress={() => setAndroid(true)} />
                </View>
            </View>
        );
    }

    //better for android
    const VideoPlayerAndroid = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <VideoPlayer
                    style={styles.backgroundVideo}
                    source={external ? imagePath.video : { uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}

                />
                <View style={styles.filterView}>

                    <Button title={external ? 'Play Online' : 'Play Local'} onPress={() => { setExternal(!external) }} />
                    <Button title='Ios' onPress={() => setAndroid(false)} />
                </View>
            </View>
        );
    }
    return (
        android ? <VideoPlayerAndroid /> : <VideoPlayerIos />
    );
}

export default VideoPlayeView;

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 64,
        right: 0,
    },
    filterView: {
        position: 'absolute',
        justifyContent: 'space-between',
        flexDirection: 'row',
        bottom: 16,

    },
});