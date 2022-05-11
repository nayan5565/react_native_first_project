
import React, { useRef, useState } from 'react';
import { Share, Text, View, Button, PermissionsAndroid, Platform } from 'react-native';
import ViewShot, { captureRef, captureScreen } from 'react-native-view-shot';
import { Fab, Header, Left, Right, Body, Title, Container, NativeBaseProvider, Icon } from "native-base";
import { Avatar } from 'react-native-paper';
import imagePath from '../constants/imagePath';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';


const ScreenshotView = (props) => {
    const [imageFile, setImageFile] = useState('')
    const viewshotRef = useRef()

    const checkPermission = async (fileName, imgUri) => {
        if (Platform.OS === 'ios') {
            createFolder(fileName, imgUri)
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                    title: 'Storage Permission Required',
                    message: 'App need access to your storage to download photos'
                }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('storage granted')
                    createFolder(fileName, imgUri)
                } else { alert('Storage permission not granted') }
            } catch (error) {
                console.warn(error)
            }
        }
    }

    function createFolder(fileName, imgUri) {
        const folderName = '/storage/emulated/0/RN';
        const path = folderName + '/' + fileName;
        RNFetchBlob.fs.isDir(folderName).then((isDir) => {
            if (isDir) {
                console.log('Already created')
                saveImage(path, imgUri)
            } else {
                RNFetchBlob.fs.mkdir(folderName).then(() => {
                    console.log('Created')
                    saveImage(path, imgUri)
                })
            }
        })
    }

    function saveImage(path, imgUri) {
        // let dirs = RNFetchBlob.fs.dirs;
        // let path = Platform.OS === 'ios' ? dirs['MainBundleDir'] + imageName : dirs.PictureDir + imageName;
        console.log('Path==>', imgUri)

        RNFetchBlob.fs.readFile(imgUri, 'base64').then((res) => {
            //Here in enter code here res you  will get base64 string 
            const folderName = '/storage/emulated/0/RN/islam.jpg';
            console.log('RNFetchBlob Convert base==>', res)
            RNFetchBlob.fs.createFile(path, res, 'base64').then(() => {
                console.log('Image saved RNFetchBlob', path)
                // setImageFile(path)
            }).catch((error) => {
                console.log(error);
            })

            // RNFS.writeFile(path, res, 'base64')
            //     .then(() => console.log('Image converted to jpg and saved at ' + path))
            //     .catch((error) => {
            //         console.log(error);
            //     })
        });

        // var pathText = RNFS.DocumentDirectoryPath + '/test.txt';
        // RNFS.writeFile(pathText, 'Lorem ipsum dolor sit amet', 'utf8')
        //     .then((success) => {
        //         console.log('FILE WRITTEN!', pathText);
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });
    }

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
        let newImgUri = imgUri.lastIndexOf('/');
        let imageName = imgUri.substring(newImgUri);
        checkPermission(imageName, imgUri)


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
            format: "png",
            quality: 0.8
        }).then(
            uri => {
                console.log("Image saved to", uri)
                setImageFile(uri)
            },
            error => console.error("Oops, snapshot failed", error)
        );
        // Share.share({ title: 'Image', url: imgUri })
    }
    return (
        <NativeBaseProvider>
            <View style={{ flex: 1 }}>
                <Button title='ScreenShot' onPress={() => captureScreenShot()} />
                <Button title='Capture View' onPress={() => captureViewShot()} />

                <Avatar.Image size={180} source={imageFile === '' ? imagePath.bike : { uri: imageFile }} />

                <ViewShot
                    style={{ flex: 1 }}
                    ref={viewshotRef}
                    options={{ format: 'jpg', quality: 1.0, result: 'tmpfile' }}

                >
                    <View
                        style={{ flex: 1, backgroundColor: 'teal', justifyContent: 'center' }}
                    >
                        <Text style={{ color: 'white', justifyContent: 'center', textAlign: 'center' }}>Capture image Love Islam</Text>
                    </View>
                    <Fab renderInPortal={false} shadow={2} size="lg" icon={<Icon color="white" name="plus" size="5xl" />} />
                </ViewShot>
            </View>
        </NativeBaseProvider>



    );
}

export default ScreenshotView;