import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import CustomBtn from '../components/CustomBtn';
import GlobalStyle from '../constants/GlobalStyle';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather'

function SignEmailScreen(props) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSecurity, setSecurity] = useState(true)

    const toggleSecurity = () => {
        setSecurity(!isSecurity)
    }

    // Handle user state changes
    function onAuthStateChanged(user) {
        if (user) {
            console.log('userData==>', user.email)
            alert('Success Login==>' + user.email)
        } alert('user currently logout')

        // setUser(user);
        // if (initializing) setInitializing(false);
    }

    function getUserData() {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }

    function signout() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    function test(val) {
        if (val === 'A')
            return true
        return 'good'
    }

    useEffect(() => {
        getUserData()
    }, []);

    function signWithEmail() {
        if (email.length > 0 && pass > 0) {
            setLoading(true)
            auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(() => {
                    setLoading(false)
                    console.log('User account created & signed in!');
                    getUserData()
                })
                .catch(error => {
                    setLoading(false)
                    getUserData()
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.warn('That email address is invalid!');
                    }

                    console.error(error);
                });
        } else alert('Required are both field')

    }
    return (
        <View style={{ marginHorizontal: 16 }}>
            <TextInput
                style={[GlobalStyle.inputStyle]}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="Email"
                keyboardType='email-address'
            />
            <View style={{ marginTop: 16 }} />
            <View style={GlobalStyle.action}>

                <TextInput
                    style={GlobalStyle.textInput}
                    onChangeText={text => setPass(text)}
                    value={pass}
                    secureTextEntry={isSecurity}
                    autoCapitalize='none'
                    placeholder="Password"
                />
                <TouchableOpacity onPress={toggleSecurity}>
                    {isSecurity ? <Feather name="eye-off" color='grey' size={20} /> : <Feather name="eye" color='teal' size={20} />}
                </TouchableOpacity>

            </View>
            <View style={{ marginTop: 16 }} />
            <CustomBtn
                btnStyle={GlobalStyle.bottomCard}
                txtStyle={GlobalStyle.whiteText}
                btnText="Sign In"
                loading={loading}
                onPress={() => signWithEmail()}
            />

            <View style={{ marginTop: 16 }} />
            <CustomBtn
                btnStyle={GlobalStyle.bottomCard}
                txtStyle={GlobalStyle.whiteText}
                btnText="Sign Out"
                onPress={() => signout()}
            />

        </View>
    );
}

export default SignEmailScreen;