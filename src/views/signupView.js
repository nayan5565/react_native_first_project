import React, { useState, useEffect } from 'react';
import { View, TextInput, Modal, Pressable, ScrollView, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import customStyle from '../../customStyle'

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
        <View style={customStyle.container}>
            <ScrollView style={{ marginTop: 12 }}>

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
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Registration</Text>
                <TextInput
                    style={customStyle.input}
                    onChangeText={onChangeName}
                    placeholder="Name"
                    returnKeyType='next'
                    keyboardType="default"
                    value={name}
                />

                <TextInput
                    style={customStyle.input}
                    onChangeText={onChangeEmail}
                    placeholder="Email"
                    returnKeyType='next'
                    keyboardType="email-address"
                    value={email}
                />

                <TextInput
                    style={customStyle.input}
                    onChangeText={onChangePhone}
                    placeholder="Phone"
                    returnKeyType='next'
                    keyboardType="phone-pad"
                    value={phone}
                />
                <TextInput
                    style={customStyle.input}
                    onChangeText={onChangeShipping}
                    placeholder="Shipping Address"
                    returnKeyType='next'
                    keyboardType="default"
                    value={shipping}
                />
                <TextInput
                    style={customStyle.input}
                    onChangeText={onChangeBilling}
                    placeholder="Billing Address"
                    returnKeyType='next'
                    keyboardType="default"
                    value={billing}
                />
                <TextInput
                    style={customStyle.input}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                />

                <TouchableOpacity style={isLoading ? customStyle.DisableButtonStyle : customStyle.SubmitButtonStyle}
                    activeOpacity={.5}
                    onPress={() => isLoading ? null : onSignup(phone, password)}>

                    {isLoading ? <ActivityIndicator color='white' /> : <Text style={customStyle.TextStyle}>Signup</Text>}

                </TouchableOpacity>

                <Text onPress={() => backLogin()} style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Back to login</Text>

            </ScrollView>
        </View>
    );
}

export default SignupView;