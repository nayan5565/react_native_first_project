import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class CustomBottomTab extends Component {
    toggleOpen = () => {

    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'grey' }}>
                <View style={styles.circle}>
                    <TouchableWithoutFeedback onPress={this.toggleOpen}>
                        <View style={[styles.button, styles.actionBtn]}>
                            <Ionicons name='add-circle-outline' size={40} color='white' />
                        </View>

                    </TouchableWithoutFeedback>

                </View>
                <View style={styles.view}>

                </View>
            </View>
        )
    }
}

export default CustomBottomTab;

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        flex: 1
    },
    circle: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'grey',
        width: 70,
        height: 70,
        bottom: 35,
        zIndex: 10,
        borderRadius: 35
    },
    button: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        width: 60,
        height: 60,
        bottom: 20,
        top: 5,
        left: 5,
        right: 0,
        shadowRadius: 2,
        borderRadius: 35
    },
    actionBtn: {
        backgroundColor: 'teal',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: 'teal'
    },
    view: {
        position: 'absolute',
        backgroundColor: 'white',
        border: 2,
        radius: 3,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: { width: 3, height: 3 },
        x: 0,
        y: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 0,
        width: '100%',
        height: 70,
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
})