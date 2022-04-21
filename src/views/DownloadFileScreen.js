import React, { useState } from 'react';
import { ActivityIndicator, Text, PermissionsAndroid, Platform, View } from 'react-native';
import CustomBtn from '../components/CustomBtn';
import RNFetchBlob from 'rn-fetch-blob'
import { Avatar } from 'react-native-paper';

const DownloadFileScreen = () => {
    const [image, setImage] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const checkPermission = async () => {
        if (Platform.OS === 'ios') {
            downloadImage()
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
                    downloadImage()
                } else { alert('Storage permission not granted') }
            } catch (error) {
                console.warn(error)
            }
        }
    }

    const downloadImage = () => {
        setLoading(true)
        setImage('')
        setErrMsg('')
        let imgUrl = 'https://static.scientificamerican.com/sciam/cache/file/EAF12335-B807-4021-9AC95BBA8BEE7C8D_source.jpg'

        let newImgUri = imgUrl.lastIndexOf('/');
        let imageName = imgUrl.substring(newImgUri);

        let dirs = RNFetchBlob.fs.dirs;
        let path = Platform.OS === 'ios' ? dirs['MainBundleDir'] + imageName : dirs.PictureDir + imageName;
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
            indicator: true,
            IOSBackgroundTask: true,
            path: path,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: path,
                description: 'Image'
            },

        })
            .fetch("GET", imgUrl, {

            })
            .then((res) => {
                setLoading(false)
                setImage(res.path())
                setErrMsg('')
                // let status = res.info().status;
                // console.log('status==>', status)
                console.log(res, 'end downloaded')
            })
            .catch((errorMessage, statusCode) => {
                setLoading(false)
                setErrMsg('something wrong')
                console.log('errorMessage==>', errorMessage)
            })
            ;



    }
    const getExtention = (fileName) => {
        return /[.]/.exec(fileName) ? /[^.]/.exec(fileName) : undefined
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CustomBtn
                onPress={checkPermission}
                btnText={'Download Image'}
                btnStyle={{
                    margin: 16,
                    backgroundColor: 'teal',
                    borderRadius: 12,
                    borderColor: 'teal'
                }}
                txtStyle={{ color: 'white' }} />
            {loading ? <ActivityIndicator /> : image === '' ? <Text>{errMsg}</Text> : (<Avatar.Image size={90} source={image === '' ? imagePath.bike : { uri: Platform.OS === 'android' ? 'file://' + image : '' + image }} />)}

        </View>
    );
}

export default DownloadFileScreen;