import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import MapScreen from '../views/MapScreen';
import DatabaseView from '../views/databaseView';
import DrawerContent from './DrawerContent';
import homeScreen from '../views/homeScreen';
import SplashScreenNew from '../views/SplashScreenNew';
import LoginView from '../views/loginView';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (

        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName="Signup" useLegacyImplementation='false'>
            <Drawer.Screen name="Map" component={MapScreen} options={{ headerShown: true }} />
            <Drawer.Screen name="Database" component={DatabaseView} options={{ headerShown: true }} />
            <Drawer.Screen name="Home" component={homeScreen} options={{ headerShown: true }} />
            <Drawer.Screen name="Splash" component={SplashScreenNew} options={{ headerShown: true }} />
            {/* <Drawer.Screen name="Login" component={LoginView} options={{ headerShown: true }} /> */}
        </Drawer.Navigator>


    );
}

export default MyDrawer;