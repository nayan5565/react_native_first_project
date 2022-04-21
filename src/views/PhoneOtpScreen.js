import React, { useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import GlobalStyle from '../constants/GlobalStyle';
import { View } from 'react-native-animatable';
import CustomBtn from '../components/CustomBtn';


function PhoneOtpScreen(props) {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [initializing, setInitializing] = useState(true);

    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false)

    // Handle user state changes
    function onAuthStateChanged(user) {
        console.log('user==>', user)
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle the button press
    async function signInWithPhoneNumber() {
        if (phone.length > 0) {
            setLoading(true)
            var phoneNumber = '+88' + phone
            console.log('Call otp==>', phoneNumber)
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setLoading(false)
            console.log('Send Code==>', confirmation);
            setConfirm(confirmation);
        } else alert('Please input phone number')

    }

    function signInWithPhone() {
        if (phone.length > 0) {
            setLoading(true)
            var phoneNumber = '+88' + phone
            console.log('Call otp==>', phoneNumber)
            auth().signInWithPhoneNumber(phoneNumber)
                .then((confirmation) => {
                    setLoading(false)
                    console.log('Send Code2==>', confirmation);
                    setConfirm(confirmation);
                })
                .catch(error => {
                    setLoading(false)
                    console.error('Err===>', error);
                });


        } else alert('Please input phone number')

    }

    // Handle the verify phone button press
    async function verifyPhoneNumber() {
        var phoneNumber = '+88' + phone
        const confirmation = await auth().verifyPhoneNumber(phoneNumber);
        console.log('Send Code3==>', confirmation);
        setConfirm(confirmation);
    }

    // Handle confirm code button press
    async function confirmCode2() {
        try {
            const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
            let userData = await auth().currentUser.linkWithCredential(credential);
            console.log('userData==>', userData)
            // setUser(userData.user);
        } catch (error) {
            if (error.code == 'auth/invalid-verification-code') {
                console.log('Invalid code.');
            } else {
                console.log('Account linking error');
            }
        }
    }

    async function confirmCode() {
        if (code.length > 5) {
            setLoading(true)
            try {
                await confirm.confirm(code);
                console.log('logged');
                alert('Successfully Login')
                setLoading(false)
            } catch (error) {
                console.log('Invalid code.');
                setLoading(false)
            }
        } else alert('Input valid code')

    }



    if (!confirm) {
        return (
            <View style={{ marginHorizontal: 16 }}>
                <TextInput
                    style={[GlobalStyle.inputStyle]}
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    placeholder="Phone"
                    keyboardType='phone-pad'
                />
                <View style={{ marginTop: 16 }} />
                <CustomBtn
                    btnStyle={GlobalStyle.bottomCard}
                    txtStyle={GlobalStyle.whiteText}
                    btnText="Phone Number Sign In"
                    loading={loading}
                    onPress={() => signInWithPhoneNumber()}
                />

            </View>

        );
    }

    return (
        <View style={{ marginHorizontal: 16 }}>
            <TextInput
                style={[GlobalStyle.inputStyle]}
                value={code} onChangeText={text => setCode(text)}
                placeholder='Verification Code'
                keyboardType='number-pad'
            />
            <View style={{ marginTop: 16 }} />
            <CustomBtn
                btnText="Confirm Code"
                btnStyle={GlobalStyle.bottomCard}
                txtStyle={GlobalStyle.whiteText}
                onPress={() => confirmCode()} />
        </View>
    );
}

export default PhoneOtpScreen;