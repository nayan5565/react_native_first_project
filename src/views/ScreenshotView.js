
import React, { useRef, useState } from 'react';
import { Text, View, Button, PermissionsAndroid, Platform, ScrollView } from 'react-native';
import ViewShot, { captureRef, captureScreen } from 'react-native-view-shot';
import { Fab, Header, Left, Right, Body, Title, Container, NativeBaseProvider, Icon } from "native-base";
import { Avatar } from 'react-native-paper';
import imagePath from '../constants/imagePath';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import RNImageToPdf from 'react-native-image-to-pdf';
import Share from 'react-native-share';


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
        // let dirs = RNFetchBlob.fs.dirs;
        // let path = Platform.OS === 'ios' ? dirs['MainBundleDir'] + fileName : dirs.PictureDir + fileName;

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
        console.log('Path==>', imgUri)

        RNFetchBlob.fs.readFile(imgUri, 'base64').then((res) => {
            //Here in enter code here res you  will get base64 string 
            // console.log('RNFetchBlob Convert base==>', res)
            RNFetchBlob.fs.createFile(path, res, 'base64').then(() => {
                console.log('Image saved RNFetchBlob', path)
                shareFile(imgUri)
                myAsyncPDFFunction(path)
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

    async function shareFile(imgageUri) {
        Share.open({ url: imgageUri })
            .then((res) => {
                console.log('share==>', res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    const myAsyncPDFFunction = async (imagePath) => {
        try {
            const options = {
                imagePaths: [imagePath],
                name: 'PDFName.pdf',
                // optional maximum image dimension - larger images will be resized
                // maxSize: { 
                //     width: 900,
                //     height: Math.round(deviceHeight() / deviceWidth() * 900),
                // },
                quality: .7, // optional compression paramter
            };
            const pdf = await RNImageToPdf.createPDFbyImages(options);



            console.log('Pdf==>', pdf.filePath);
        } catch (e) {
            console.log(e);
        }
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
    }
    async function captureScreenShot() {
        captureScreen({
            format: "png",
            quality: 0.8
        }).then(
            uri => {
                console.log("Image saved to", uri)
                setImageFile(uri)
                shareFile(uri)
            },
            error => console.error("Oops, snapshot failed", error)
        );
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
                    <ScrollView style={{ flex: 1 }}>
                        <View>
                            <Button
                                title="Utils"
                                onPress={() => this.props.navigation.navigate('Utils')}
                            />
                            <Button
                                title="Home"
                                onPress={() => this.props.navigation.navigate('Home')}
                            />
                            <Button
                                title="Firebase"
                                onPress={() => this.props.navigation.navigate('FirebaseAuthDesign')}
                            />
                            <Button
                                title="Download"
                                onPress={() => this.props.navigation.navigate('Download')}
                            />
                            <Button
                                title="Phone Input Field"
                                onPress={() => this.props.navigation.navigate('PhoneField')}
                            />
                            <Button
                                title="OTP Input Field"
                                onPress={() => this.props.navigation.navigate('OTP')}
                            />
                            <Button
                                title="Drawer"
                                onPress={() => this.props.navigation.navigate('Drawer')}
                            />
                            <Button
                                title="Screenshot"
                                onPress={() => this.props.navigation.navigate('Screenshot')}
                            />
                            <Button
                                title="Pick File"
                                onPress={() => this.props.navigation.navigate('PickFile')}
                            />
                            <Button
                                title="Audo Player"
                                onPress={() => this.props.navigation.navigate('AudioPlayer')}
                            />

                            <Button
                                title="Video Player"
                                onPress={() => this.props.navigation.navigate('VideoPlayer')}
                            />
                            <Button
                                title="Push Notification"
                                onPress={() => this.props.navigation.navigate('PushNotification')}
                            />
                            <Button
                                title="Bottom Tab"
                                onPress={() => this.props.navigation.navigate('BottomTab')}
                            />
                            <Button
                                title="Bottom Sheet and pick image"
                                onPress={() => this.props.navigation.navigate('BottomSheet')}
                            />
                            <Button
                                title="Tab Bar"
                                onPress={() => this.props.navigation.navigate('TabBar')}
                            />
                            <Button
                                title="Custom Bottom Tab"
                                onPress={() => this.props.navigation.navigate('CustomBottomTab')}
                            />
                            <Button
                                title="On Boarding"
                                onPress={() => this.props.navigation.navigate('OnBoard')}
                            />
                            <Button
                                title="Map"
                                onPress={() => this.props.navigation.navigate('Map')}
                            />
                            <Button
                                title="Redux"
                                onPress={() => this.props.navigation.navigate('Redux')}
                            />
                            <Button
                                title="Redux Hook"
                                onPress={() => this.props.navigation.navigate('ReduxHook')}
                            />
                            {/* <ComponentTwo name="Nayan" city='Dhaka' />
                        <ComponentThree name="Nurul" city='Narail' /> */}
                            <Button
                                title="ApiCall"
                                onPress={() => this.props.navigation.navigate('Api')}
                            />
                            <Button
                                title="Database"
                                onPress={() => this.props.navigation.navigate('Database')}
                            />
                            <Button
                                title="ApiFunc"
                                onPress={() => this.props.navigation.navigate('ApiFunc')}
                            />
                            <Button
                                title="ListView"
                                onPress={() => this.props.navigation.navigate('List')}
                            />
                            <Button
                                title="Login"
                                onPress={() => this.props.navigation.navigate('Login')}
                            />
                            {/* <Button
                            title="Go to Details"
                            onPress={() => this.props.navigation.navigate('Details', {
                                itemId: 86,
                                otherParam: 'anything you want here',
                            })}
                        /> */}
                            {/* <ComponentImage /> */}
                        </View>
                    </ScrollView>
                    <Fab renderInPortal={false} shadow={2} size="lg" icon={<Icon color="white" name="plus" size="5xl" />} />
                </ViewShot>
            </View>
        </NativeBaseProvider>



    );
}

export default ScreenshotView;