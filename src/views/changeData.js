import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCounter, increaseCounter } from '../redux/actions/counterAction';
import { getCities } from '../redux/actions/apiActions';

const ChangeData = () => {
    // const [timesPressed, setTimesPressed] = useState(0);
    const dispatch = useDispatch()
    const increaseCount = () => dispatch(increaseCounter())
    const decreaseCount = () => dispatch(decreaseCounter())
    const getData = () => dispatch(getCities())
    const { counter } = useSelector((state) => state.counter)
    const { cities, status } = useSelector((state) => state.apis)

    useEffect(() => {
        getData()
    }, []);
    let textLog = '';
    if (counter > 1) {
        textLog = counter + 'x onPress';
    } else if (counter > 0) {
        textLog = 'onPress';
    }

    return (
        <View style={styles.container}>
            <Pressable
                // onPress={() => {
                // setTimesPressed((current) => current + 1);
                // }}
                onPress={() => increaseCount()}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'rgb(210, 230, 255)'
                            : 'white'
                    },
                    styles.wrapperCustom
                ]}>
                {({ pressed }) => (
                    <Text style={styles.text}>
                        {pressed ? 'Pressed increase' : 'Press Me increase'}
                    </Text>
                )}
            </Pressable>
            <Pressable
                // onPress={() => {
                // setTimesPressed((current) => current + 1);
                // }}
                onPress={() => decreaseCount()}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'rgb(210, 230, 255)'
                            : 'white'
                    },
                    styles.wrapperCustom
                ]}>
                {({ pressed }) => (
                    <Text style={styles.text}>
                        {pressed ? 'Pressed decrease' : 'Press Me decrease'}
                    </Text>
                )}
            </Pressable>
            <View style={styles.logBox}>
                <Text testID="pressable_press_console">{textLog}</Text>
                <Text >Status: {status}</Text>
            </View>
            {status == '' ? <ActivityIndicator color='red' /> : status !== 'success' ? <Text >Error</Text> : (<FlatList
                data={cities}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <Text>{item.title}, {item.releaseYear}</Text>
                )}
            />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    text: {
        fontSize: 16
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6
    },
    logBox: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9'
    }
});

export default ChangeData;