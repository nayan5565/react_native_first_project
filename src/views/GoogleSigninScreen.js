import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const GoogleSigninScreen = (props) => {


    const [isSigned, setSigned] = useState(false)

    useEffect(() => {
        isSignedIn()
    }, [])
    // const onGoogleButtonPress = async () => {

    //     try {
    //         // Get the users ID token
    //         const { idToken } = await GoogleSignin.signIn();

    //         console.log('idToken==>', idToken)
    //         // Create a Google credential with the token
    //         const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    //         // Sign-in the user with the credential
    //         await auth().signInWithCredential(googleCredential);
    //     } catch (error) {
    //         console.log('googleSigninErr==>', error)
    //     }

    // }
    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        setSigned(isSignedIn)
        console.log('isSignedIn==>', isSignedIn)
        if (isSignedIn) {
            getCurrentUser()
        }
    };
    const signIn = async () => {
        if (!isSigned) {
            try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                console.log('userInfo==>', userInfo)
            } catch (error) {
                console.log('googlesignInError==>', error)
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    // user cancelled the login flow
                } else if (error.code === statusCodes.IN_PROGRESS) {
                    // operation (e.g. sign in) is in progress already
                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    // play services not available or outdated
                } else {
                    // some other error happened
                }
            }
        } else alert('You have already signed')

    }

    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log('currentUser==>', currentUser)

    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            console.log('signOut');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', marginVertical: 16 }}>
            {/* <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => onGoogleButtonPress()}

            /> */}
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => signIn()}

            />
        </View>
    );
}

export default GoogleSigninScreen;