import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, FlatList, View, Text, TextInput, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import customStyle from '../customStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginView = ({ navigation }) => {

    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState({});

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
            "emailOrPhone": "+88" + email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://ctapi.shadhinlab.xyz/dev/auth/authentication/signin", requestOptions)
            .then(response => response.json())
            .then(result => changeScreen(result.data))
            // .then(result => changeScreen(result.data))
            .catch(error => console.log('error', error)).finally(() => setLoading(false));
    }
    const changeScreen = (loginData) => {
        // setUserData(loginData)
        console.log("userData: " + JSON.stringify(loginData))
        storeData(true)
        navigation.navigate('Details', {
            users: loginData,
        });
    }

    const getMovies2 = async () => {
        try {
            const response = await fetch('https://reactnative.dev/movies.json');
            console.log('Response: ' + JSON.stringify(response))
            const json = await response.json();


            setData(json.movies);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const getMovies = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://reactnative.dev/movies.json", requestOptions)
            .then(response => response.json())
            .then(result => setData(result.movies))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (userData.myEmail) {
            console.log(userData.myEmail)
        }
    }, [userData]);
    return (


        <View style={customStyle.container}>
            <TextInput
                style={customStyle.input}
                onChangeText={onChangeEmail}
                placeholder="Phone"
                returnKeyType='next'
                keyboardType="phone-pad"
                value={email}
            />
            <TextInput
                style={customStyle.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
            />

            <TouchableOpacity style={customStyle.SubmitButtonStyle}
                activeOpacity={.5}
                onPress={() => onLogin(email, password)}>

                {isLoading ? <ActivityIndicator color='white' /> : <Text style={customStyle.TextStyle}>Login</Text>}

            </TouchableOpacity>
        </View>


    );
};

const styles = StyleSheet.create({

    button: {
        margin: 10,
        padding: 12,
        alignItems: "center",
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    },
});

export default LoginView;