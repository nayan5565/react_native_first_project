import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginView from '../views/loginView';
import SignupView from '../views/signupView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChangeData from '../views/changeData';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const TabButton = () => {
    return (
        <View style={styles.circle}>
            <TouchableWithoutFeedback onPress={() => { alert('create') }}>
                <View style={[styles.button, styles.actionBtn]}>
                    <Ionicons name='add-circle-outline' size={40} color='white' />
                </View>

            </TouchableWithoutFeedback>

        </View>

    )
}

const Tab = createBottomTabNavigator();
function MyBottomTab(props) {
    const { counter } = useSelector((state) => state.counter)
    return (
        <Tab.Navigator

            initialRouteName="Counter" screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Counter') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Signup') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: true,
                tabBarStyle: { position: 'absolute', backgroundColor: 'teal' }
            })}>
            <Tab.Screen name="Counter" component={ChangeData} options={{ tabBarBadge: counter }} />
            <Tab.Screen name="Home" component={ChangeData} options={{ tabBarButton: TabButton, }} />
            <Tab.Screen name="Signup" component={SignupView} />
        </Tab.Navigator>
    );
}

export default MyBottomTab;
const styles = StyleSheet.create({

    circle: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
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