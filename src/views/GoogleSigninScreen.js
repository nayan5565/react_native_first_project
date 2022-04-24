import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const GoogleSigninScreen = (props) => {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '278308056726-ldqq88sauois1l8kimgmvl2lmknmemmt.apps.googleusercontent.com',
        });
    }, [])
    const onGoogleButtonPress = async () => {

        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    // const signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log('userInfo==>', userInfo)
    //     } catch (error) {
    //         console.log('googleError==>', error)
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //         }
    //     }
    // }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}

            />
            {/* <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => signIn()}

            /> */}
        </View>
    );
}

export default GoogleSigninScreen;