import React, { useState } from 'react';
import { Button, Modal, Image, View, SafeAreaView, Text, Alert, Pressable, Share, TouchableOpacity } from 'react-native';
// import CircularProgress from 'react-native-circular-progress-indicator';
import customStyle from '../../customStyle'
import imagePath from '../constants/imagePath';

const Separator = () => (
    <View style={customStyle.separator} />
);
const onShare = async () => {
    try {
        const result = await Share.share({
            message:
                'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};

const UtilsView = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [timesPressed, setTimesPressed] = useState(0);

    let textLog = '';
    if (timesPressed > 1) {
        textLog = timesPressed + 'x onPress';
    } else if (timesPressed > 0) {
        textLog = 'onPress';
    }
    return (
        <SafeAreaView style={customStyle.container}>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={customStyle.centeredView}>
                        <View style={customStyle.modalView}>
                            <Text style={customStyle.modalText}>Hello World!</Text>
                            <Pressable
                                style={[customStyle.button, customStyle.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={customStyle.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Text style={customStyle.title}>
                    The title and onPress handler are required. It is recommended to set accessibilityLabel to help make your app usable by everyone.
                </Text>
                <TouchableOpacity
                    style={customStyle.SubmitButtonStyle}
                    activeOpacity={.5}
                    onPress={onShare}
                >

                    <Text style={customStyle.TextStyle}> SUBMIT </Text>

                </TouchableOpacity>
                {/* <CircularProgress
            value={60}
            radius={120}
            duration={2000}
            textColor={'#ecf0f1'}
            maxValue={200}
            title={'KM/H'}
            titleColor={'white'}
            titleStyle={{ fontWeight: 'bold' }}
          /> */}

                <Pressable
                    onPress={() => {
                        setTimesPressed((current) => current + 1);
                    }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? 'rgb(210, 230, 255)'
                                : 'white'
                        },
                        customStyle.wrapperCustom
                    ]}>
                    {({ pressed }) => (
                        <Text style={customStyle.text}>
                            {pressed ? 'Pressed!' : 'Press Me'}
                        </Text>
                    )}
                </Pressable>
                <View style={customStyle.logBox}>
                    <Text testID="pressable_press_console">{textLog}</Text>
                </View>
            </View>
            <Separator />
            <View>
                <Button

                    title="Press me"
                    onPress={() => {
                        setTimesPressed((current) => current + 1);
                    }}
                // onPress={() => Alert.alert('Simple Button pressed')}
                />
                <Text style={customStyle.title}>
                    Adjust the color in a way that looks standard on each platform. On  iOS, the color prop controls the color of the text. On Android, the color adjusts the background color of the button.
                </Text>
                <Button
                    title="Modal dialog"
                    color="#f194ff"
                    onPress={() => setModalVisible(true)}
                />
            </View>
            <Separator />
            <View>
                <Text style={customStyle.title}>
                    All interaction for the component are disabled.
                </Text>
                <Button
                    title="Cannot Press me"
                    disabled
                    onPress={() => Alert.alert('Cannot press this one')}
                />
            </View>
            <Separator />
            <View>
                <Image style={{ width: '100%', height: '30%' }} source={imagePath.imgBanner} />
            </View>
            <View>
                <Text style={customStyle.title}>
                    This layout strategy lets the title define the width of the button.
                </Text>
                <View style={customStyle.fixToText}>
                    <Button
                        title="Left button"
                        onPress={() => Alert.alert('Left button pressed')}
                    />
                    <Button
                        title="Right button"
                        onPress={() => Alert.alert('Right button pressed')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default UtilsView;