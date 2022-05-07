import React from 'react';
import { Button, View, NativeModules } from 'react-native';
import auth from '@react-native-firebase/auth';
const { RNTwitterSignIn } = NativeModules;

function TwitterSigin(props) {

    async function onTwitterButtonPress() {
        // Perform the login request
        const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

        // Create a Twitter credential with the tokens
        const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

        // Sign-in the user with the credential
        auth().signInWithCredential(twitterCredential).then(userData => {
            console.log('userData==>', userData)
            console.log('userName==>', userData.user.displayName)
            console.log('userImage==>', userData.user.photoURL)
        }).catch(error => {
            console.log('userErr==>', error)
        });
    }

    const onTwitterLogin = async () => {
        // Perform the login request
        RNTwitterSignIn.logIn().then(loginData => {
            console.log('loginData==>', loginData)
        }).catch(error => {
            console.log('loginERR==>', error)
        });

        // // Create a Twitter credential with the tokens
        // const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

        // // Sign-in the user with the credential
        // const userInfo = await auth().signInWithCredential(twitterCredential);
        // console.log('userInfo==>', userInfo.user.displayName)
    }
    return (
        <View>
            <Button
                title="Twitter Sign-In"
                onPress={() => onTwitterButtonPress()}
            />

            <Button
                title="Twitter Login"
                onPress={() => onTwitterLogin()}
            />
        </View>
    );
}

export default TwitterSigin;