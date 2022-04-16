import React, { useState, useEffect } from 'react';
import { View, TextInput, Modal, StyleSheet, Pressable, ScrollView, ActivityIndicator, TouchableOpacity, Text, StatusBar } from 'react-native';
import customStyle from '../../customStyle'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';

const SignupView = ({ navigation }) => {
    const [name, onChangeName] = useState("");
    const [email, onChangeEmail] = useState("");
    const [phone, onChangePhone] = useState("");
    const [shipping, onChangeShipping] = useState("");
    const [billing, onChangeBilling] = useState("");
    const [confirmationCode, onChangeConfirmationCode] = useState("");
    const [password, onChangePassword] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isConfirmLoading, setConfirmLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSecurity, setSecurity] = useState(true)

    const toggleSecurity = () => {
        setSecurity(!isSecurity)
    }


    const onSignup = async () => {
        if (name == null || phone == null || shipping == null || billing == null || password == null) {
            alert('Please enter all field');
            return false;
        }
        setLoading(true)
        signupApi()
    };
    const signupApi = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": name,
            "password": password,
            "medium": "phone",
            "email": email,
            "phone": "+88" + phone,
            "role": "customer",
            "shipping_address": shipping,
            "billing_address": billing
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            const response = await fetch("https://kjggeg8yjl.execute-api.us-west-2.amazonaws.com/qa/auth/authentication/signup", requestOptions);
            const result = await response.json();
            if (response.status == 200) {
                // console.log('Login res: ' + JSON.stringify(result.data));
                // changeScreen(result.data)
                setModalVisible(!modalVisible);
            } else {
                alert(result.message)
            }

        } catch (error) {
            console.log('Signup err: ' + JSON.stringify(error));
            alert(error)

        } finally {
            setLoading(false);
        }

    }

    const confirmSignupApi = async () => {
        if (phone == null || confirmationCode == null) {
            alert('Please enter all field');
            return false;
        }
        setConfirmLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({

            "medium": "phone",
            "emailOrPhone": "+88" + phone,
            "confirmationCode": confirmationCode
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            const response = await fetch("https://kjggeg8yjl.execute-api.us-west-2.amazonaws.com/qa/auth/authentication/confirm-signup", requestOptions);
            const result = await response.json();
            if (response.status == 200) {
                setModalVisible(!modalVisible);
                navigation.goBack()
            } else {
                alert(result.message)
            }

        } catch (error) {
            console.log('Confirm err: ' + JSON.stringify(error));
            alert(error)

        } finally {
            setConfirmLoading(false);
        }

    }

    const backLogin = () => {
        navigation.goBack();
    }

    useEffect(() => {
        let isMounted = true;               // note mutable flag

        if (isMounted) {

        }

        return () => { isMounted = false };

    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Registration now!</Text>
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={customStyle.centeredView}>
                    <View style={customStyle.modalView}>
                        <Text style={customStyle.modalText}>Confirm Signup</Text>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                margin: 12,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 8,
                                padding: 10,
                            }}
                            onChangeText={onChangePhone}
                            placeholder="Phone"
                            returnKeyType='next'
                            keyboardType="phone-pad"
                            value={phone}
                        />
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                margin: 12,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 8,
                                padding: 10,
                            }}
                            onChangeText={onChangeConfirmationCode}
                            value={confirmationCode}
                            placeholder="Confirmation Code"
                            keyboardType="number-pad"
                        />
                        <View style={{ flexDirection: 'row' }}>

                            <Pressable
                                style={[customStyle.button, customStyle.buttonClose]}
                                onPress={() => confirmSignupApi()}
                            >
                                {isConfirmLoading ? <ActivityIndicator color='white' /> : <Text style={customStyle.textStyle}>Confirm</Text>}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                {/* <ScrollView style={{ marginTop: 12 }}> */}
                <TextInput
                    style={[customStyle.input, { marginTop: 12, marginHorizontal: 12 }]}
                    onChangeText={onChangeName}
                    placeholder="Name"
                    returnKeyType='next'
                    keyboardType="default"
                    value={name}
                />

                <TextInput
                    style={[customStyle.input, { marginTop: 12, marginHorizontal: 12 }]}
                    onChangeText={onChangeEmail}
                    placeholder="Email"
                    returnKeyType='next'
                    keyboardType="email-address"
                    value={email}
                />

                <TextInput
                    style={[customStyle.input, { marginTop: 12, marginHorizontal: 12 }]}
                    onChangeText={onChangePhone}
                    placeholder="Phone"
                    returnKeyType='next'
                    keyboardType="phone-pad"
                    value={phone}
                />
                <TextInput
                    style={[customStyle.input, { marginTop: 12, marginHorizontal: 12 }]}
                    onChangeText={onChangeShipping}
                    placeholder="Shipping Address"
                    returnKeyType='next'
                    keyboardType="default"
                    value={shipping}
                />
                <TextInput
                    style={[customStyle.input, { marginTop: 12, marginHorizontal: 12 }]}
                    onChangeText={onChangeBilling}
                    placeholder="Billing Address"
                    returnKeyType='next'
                    keyboardType="default"
                    value={billing}
                />
                <TextInput
                    style={[customStyle.input, { marginTop: 12, marginHorizontal: 12 }]}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                />
                <Animatable.View animation='bounceInLeft' delay={600}>
                    <TouchableOpacity style={isLoading ? customStyle.DisableButtonStyle : customStyle.SubmitButtonStyle}
                        activeOpacity={.5}
                        onPress={() => isLoading ? null : onSignup(phone, password)}>

                        {isLoading ? <ActivityIndicator color='white' /> : <Text style={customStyle.TextStyle}>Signup</Text>}

                    </TouchableOpacity>
                </Animatable.View>


                <Animatable.Text animation='bounceInRight' delay={600} onPress={() => backLogin()} style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Back to login</Animatable.Text>
                {/* </ScrollView> */}
            </Animatable.View>


        </View>
    );
}

export default SignupView;
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
        flex: 6,
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