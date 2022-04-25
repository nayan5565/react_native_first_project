import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text, TextInput, ActivityIndicator, TouchableOpacity, Platform, StatusBar } from "react-native";
import customStyle from '../../customStyle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';



const LoginView = ({ navigation }) => {

    const [phone, onChangePhone] = useState("");
    const [password, onChangePassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isSecurity, setSecurity] = useState(true)
    const toggleSecurity = () => {
        setSecurity(!isSecurity)
    }

    const onLogin = async (email, password) => {
        if (email == null || password == null) {
            alert('enter phone and password');
            return false;
        }
        setLoading(true)
        console.log('Email: ' + email + 'pass: ' + password);
        loginApi()
        // getMovies2()
    };

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('isLogin', JSON.stringify(value))
        } catch (e) {
            console.log(e)
            // saving error
        }
    }

    const storeDataObject = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }

    const getDataObject = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }


    const loginApi = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "medium": "phone",
            "emailOrPhone": "+88" + phone,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        // fetch("https://ctapi.shadhinlab.xyz/dev/auth/authentication/signin", requestOptions)
        //     .then(response => response.json())
        //     .then(result => console.log('Login res: ' + JSON.stringify(response)))
        // .then(result => changeScreen(result.data))
        //     .catch(error => console.log('error', error)).finally(() => setLoading(false));
        try {
            const response = await fetch("https://kjggeg8yjl.execute-api.us-west-2.amazonaws.com/qa/auth/authentication/signin", requestOptions);
            const result = await response.json();
            if (response.status == 200) {
                // console.log('Login res: ' + JSON.stringify(result.data));
                changeScreen(result.data)
            } else {
                alert(result.message)
            }

        } catch (error) {
            console.log('Login err: ' + JSON.stringify(error));
            alert(error)

        } finally {
            setLoading(false);
        }

    }
    const changeScreen = (loginData) => {
        // setUserData(loginData)
        console.log("userData: " + JSON.stringify(loginData))
        storeData(true)
        navigation.replace('Landing')
        // navigation.replace('Database', {
        //     users: loginData,
        // });
    }

    const goSignupView = () => {
        storeData(true)
        navigation.navigate('Signup');
    }

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        if (isMounted) {

        }
        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, []);
    return (

        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome!</Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <Text style={styles.textFooter}>Phone</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color='#05375a' size={20} />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={onChangePhone}
                        placeholder="Phone"
                        returnKeyType='next'
                        keyboardType="phone-pad"
                        value={phone}
                    />
                    {phone.length == 11 ? <Animatable.View animation='bounceInRight'>
                        <Feather name="check-circle" color='green' size={20} />
                    </Animatable.View> : null}
                </View>
                <Text style={[styles.textFooter, { marginTop: 16 }]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color='#05375a' size={20} />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={onChangePassword}
                        value={password}
                        secureTextEntry={isSecurity}
                        autoCapitalize='none'
                        placeholder="Password"
                    />
                    <TouchableOpacity onPress={toggleSecurity}>
                        {isSecurity ? <Feather name="eye-off" color='grey' size={20} /> : <Feather name="eye" color='teal' size={20} />}
                    </TouchableOpacity>

                </View>

                {password.length >= 8 ? null : <Animatable.Text animation='bounceInLeft' style={{ color: 'red', fontSize: 10 }}>Password must be 8 character</Animatable.Text>}

                <Animatable.View animation='bounceInLeft' delay={600}>
                    <TouchableOpacity style={isLoading ? customStyle.DisableButtonStyle : customStyle.SubmitButtonStyle}
                        activeOpacity={.5}
                        onPress={() => isLoading ? null : onLogin(phone, password)}>

                        {isLoading ? <ActivityIndicator color='white' /> : <Text style={customStyle.TextStyle}>Login</Text>}

                    </TouchableOpacity>
                </Animatable.View>


                <Animatable.Text animation='bounceInRight' delay={600} onPress={() => goSignupView()} style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Create New Account</Animatable.Text>
            </Animatable.View>

        </View>


    );
};

export default LoginView;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 28,
        paddingVertical: 30
    },

    textFooter: {
        color: '#05375a',
        fontSize: 18,
    },
    textHeader: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 30,
    },
    action: {
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5,
        color: '#05375a',
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,

    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signin: {
        width: '100%',
        height: 50,
        backgroundColor: 'teal',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSignin: {
        fontWeight: 'bold',
        fontSize: 18,
    },


})