import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Home from '../component/screens/appScreens/home';
import * as Utils from '../utility';
import LocationWeatherDetail from '../component/screens/appScreens/locationWeatherDetail';
import AddLocation from '../component/screens/appScreens/addLocation';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name={Utils.Constants.SCREEN_HOME} component={Home} />
        <Stack.Screen
          name={Utils.Constants.SCREEN_ADD_LOCATION}
          component={AddLocation}
        />
        <Stack.Screen
          name={Utils.Constants.SCREEN_LOCATION_WEATHER_DETAIL}
          component={LocationWeatherDetail}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigator;
