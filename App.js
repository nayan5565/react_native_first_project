import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingView from './views/landingView';
import HomeScreen from './views/homeScreen';
import DetailsScreen from './views/detailsScreen';
import ListItemView from './views/listItemView';
import ApiCallView from './views/apiCallView';
import ApiCallInFunctionComponent from './views/apiCallInFunctionComponent';
import LoginView from './views/loginView';
import DatabaseView from './views/databaseView';
import SplashView from './views/splashView';
import UtilsView from './views/utilsView';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import friendsReducer from './reducer/friendsReducer';
import homeScreenNew from './views/homeScreenNew';
import friendsScreen from './views/friendsScreen';
import allReducers from './reducer/allReducer';
import SignupView from './views/signupView';
// import SQLite from 'react-native-sqlite-storage';

// global.db = SQLite.openDatabase(
//     {
//         name: 'MainDB',
//         location: 'default',
//         createFromLocation: '~SQLite.db',
//     },
//     () => { },
//     error => {
//         console.log("ERROR: " + error);
//     }
// );

const store = createStore(allReducers);
const Stack = createNativeStackNavigator();
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashView} options={{ headerShown: false }} />
            <Stack.Screen name="Redux" component={homeScreenNew} />
            <Stack.Screen name="Signup" component={SignupView} options={{ headerShown: false }} />
            <Stack.Screen name="Friends" component={friendsScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Database" component={DatabaseView} />
            <Stack.Screen name="List" component={ListItemView} />
            <Stack.Screen name="Landing" component={LandingView} />
            <Stack.Screen name="Api" component={ApiCallView} />
            <Stack.Screen name="Utils" component={UtilsView} />
            <Stack.Screen name="Login" component={LoginView} options={{ headerShown: false }} />
            <Stack.Screen name="ApiFunc" component={ApiCallInFunctionComponent} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>

    );
  }
}

export default App;