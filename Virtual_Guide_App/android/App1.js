import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignInScreen from './src/screens/SignInScreen';
import SplashScreen from './src/screens/SplashScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import ShareScreen from './src/screens/ShareScreen';
import EmmergencyScreen from './src/screens/EmmergencyScreen';
import TransportationScreen from './src/screens/TransportationScreen';
import PriceListScreen from './src/screens/PriceListScreen';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator(
    {
      Splash: SplashScreen,
      Login: LoginScreen,
      Signin: SignInScreen,
    },
    {headerMode: 'none'},
  ),
  mainFlow: createBottomTabNavigator({
    Home: HomeScreen,
    Activity: ActivityScreen,
    Share: ShareScreen,
    Emmergency: EmmergencyScreen,
    Transportation: TransportationScreen,
    PriceList: PriceListScreen,
  }),
});

export default createAppContainer(switchNavigator);

//"react-native-firebase": "^5.6.0",
