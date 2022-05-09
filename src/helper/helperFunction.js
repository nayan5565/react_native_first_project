import { PermissionsAndroid, Platform } from "react-native";
import { showMessage } from "react-native-flash-message";
import Geolocation from 'react-native-geolocation-service';

export const getCurrentLocation = () => new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
        position => {
            const cords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                heading: position.coords.heading
            }
            // console.log('cords==>', position)
            resolve(cords)
        },
        error => {
            reject(error.message)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
})
export const locationPermission = () => new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
        try {
            const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
            if (permissionStatus === 'granted') {
                return resolve('granted')
            }
            reject('Permission not granted')
        }
        catch (error) {
            return reject(error)
        }
    }
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then((granted) => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                resolve('granted')
            }
            return reject('Location Permission Denied')
        }).catch((error) => {
            return reject(error)
        })
})
const showError = (msg) => {
    showMessage({
        message: msg,
        icon: 'danger',
        type: "danger",
    });
}
const showSuccess = (msg) => {
    showMessage({
        message: msg,
        icon: 'success',
        type: "success",
    });
}

export {
    showError,
    showSuccess
}

export const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" :
        "") + seconds);
}

export const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

export const secondsToHms2 = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "00:";
    var sDisplay = s > 0 ? s + (s < 10 ? "0" : "") : "00";
    // return hDisplay + mDisplay + sDisplay;
    return (s == 60 ? (m + 1) + ":00" : (m < 10 ? "0" :
        "") + m + ":" + (s < 10 ? "0" :
            "") + s);
}