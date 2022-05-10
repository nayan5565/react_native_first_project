
import React, { useRef, useState } from 'react';
import { Share, Text, View, Button } from 'react-native';
import ViewShot, { captureRef, captureScreen } from 'react-native-view-shot';
import { Fab, Header, Left, Right, Body, Title, Container, NativeBaseProvider, Icon } from "native-base";
import { Avatar } from 'react-native-paper';
import imagePath from '../constants/imagePath';

const ScreenshotView = (props) => {
    const [imageFile, setImageFile] = useState('')
    const viewshotRef = useRef()
    async function captureViewShot() {
        // captureRef(viewshotRef, {
        //     format: "jpg",
        //     quality: 0.8
        // }).then(
        //     uri => console.log("Image saved to", uri),
        //     error => console.error("Oops, snapshot failed", error)
        // );
        const imgUri = await viewshotRef.current.capture()
        console.log('Capture imgUri==>', imgUri)
        setImageFile(imgUri)
        // Share.share({ title: 'Image', url: imgUri })
        // try {
        //     const result = await Share.share({ title: 'Image', url: 'file:///storage/emulated/0/Gajol/ektaMasjidBanaiaDe.MP3', message: 'image' });

        //     if (result.action === Share.sharedAction) {
        //         if (result.activityType) {
        //             // shared with activity type of result.activityType
        //         } else {
        //             // shared
        //         }
        //     } else if (result.action === Share.dismissedAction) {
        //         // dismissed
        //     }
        // } catch (error) {
        //     alert(error.message);
        // }
    }
    async function captureScreenShot() {
        captureScreen({
            format: "jpg",
            quality: 0.8
        }).then(
            uri => console.log("Image saved to", uri),
            error => console.error("Oops, snapshot failed", error)
        );
        // Share.share({ title: 'Image', url: imgUri })
    }
    return (
        <NativeBaseProvider>
            <View style={{ flex: 1 }}>
                <Button title='ScreenShot' onPress={() => captureViewShot()} />
                <Button title='Capture' onPress={() => captureScreenShot()} />

                <Avatar.Image size={180} source={imageFile === '' ? imagePath.bike : { uri: imageFile }} />

                <ViewShot
                    style={{ flex: 1 }}
                    ref={viewshotRef}
                    options={{ format: 'jpg', quality: 1.0 }}
                >
                    <View
                        style={{ flex: 1, backgroundColor: 'teal', justifyContent: 'center' }}
                    >
                        <Text style={{ color: 'white', justifyContent: 'center', textAlign: 'center' }}>Capture image</Text>
                    </View>
                    <Fab renderInPortal={false} shadow={2} size="lg" icon={<Icon color="white" name="plus" size="5xl" />} />
                </ViewShot>
            </View>
        </NativeBaseProvider>



    );
}

export default ScreenshotView;