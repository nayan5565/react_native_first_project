/**
 * @format
 */

import React from "react";
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import ChangeData from './views/changeData';
import LandingView from './views/landingView';
import ListItemView from './views/listItemView';
import SplashView from './views/splashView';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
// import { Provider as PaperProvider } from 'react-native-paper';


// export default function Main() {
//     return (
//         <PaperProvider>
//             <SplashView />
//         </PaperProvider>
//     );
// }

// AppRegistry.registerComponent(appName, () => Main);
AppRegistry.registerComponent(appName, () => App);
