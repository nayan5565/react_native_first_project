import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G, } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NextButton = ({ percentage, scrollTo }) => {

    const size = 128
    const strokeWidth = 2
    const center = size / 2
    const radius = size / 2 - strokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const progressAnimation = useRef(new Animated.Value(0)).current
    const progressRef = useRef(null)

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start()
    }


    useEffect(() => {
        animation(percentage)
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100


            if (progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        }, [percentage])
        return () => {
            progressAnimation.removeAllListeners()
        }
    }, []);


    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#E6E7E8"
                    strokeWidth={strokeWidth}
                />
                <Circle
                    ref={progressRef}
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#F4338F"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                // strokeDashoffset={circumference - (circumference * percentage) / 100}

                />
            </Svg>
            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={scrollTo}>

                <Ionicons name='arrow-forward' size={40} color='white' />


            </TouchableOpacity>
        </View>
    )

}

export default NextButton;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        position: 'absolute',
        backgroundColor: '#f4338f',
        borderRadius: 100,
        padding: 20
    }
})