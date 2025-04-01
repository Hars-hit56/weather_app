import {
  ColorValue,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StatusBarStyle,
} from 'react-native';
import NavigationService from '../NavigationService';
import colors from './colors';
import {Images} from './imagePaths';
import Geolocation from 'react-native-geolocation-service';

//NAVIGATION FUNCTIONS
export const navigate = (routeName: string, params?: Record<string, any>) => {
  //code to tarck
  NavigationService.navigate(routeName, params);
};

export const replace = (routeName: string, params?: Record<string, any>) => {
  NavigationService.replace(routeName, params);
};

export const goBack = () => {
  NavigationService.back();
};

export const openDrawer = () => {
  NavigationService.openDrawer();
};

export const closeDrawer = () => {
  NavigationService.closeDrawer();
};

export const clearStack = (routeName: string, params = {}) => {
  NavigationService.clearStack(routeName, params);
};

export const push = (routeName: string, params = {}) => {
  NavigationService.push(routeName, params);
};

//STATUSBAR & SAFEAREAVIEW FUNCTIONS
export const changeStatusBarColor = (
  top: ColorValue,
  style: StatusBarStyle,
) => {
  StatusBar.setBarStyle(style);
  if (Platform.OS == 'android') {
    StatusBar.setBackgroundColor(top);
  }
};

export const getWeatherColor = (weatherType: string): string => {
  const color: Record<string, string> = {
    Thunderstorm: colors.THUNDERSTROM_COLOR,
    Drizzle: colors.DRIZZLE_COLOR,
    Rain: colors.RAIN_COLOR,
    Snow: colors.SNOW_COLOR,
    Atmosphere: colors.ATMOSPHERE_COLOR,
    Clear: colors.CLEAR_COLOR,
    Clouds: colors.CLOUDS_COLOR,
  };
  return color[weatherType] || colors.CLOUDS_COLOR;
};

export const getWeatherIcon = (weatherType: string) => {
  switch (weatherType) {
    case 'Thunderstorm':
      return Images.IMG_THUNDERSTROM;

    case 'Drizzle':
      return Images.IMG_DRIZZLE;

    case 'Rain':
      return Images.IMG_RAIN;

    case 'Snow':
      return Images.IMG_SNOW;

    case 'Atmosphere':
      return Images.IMG_ATMOSPHERE;

    case 'Clouds':
      return Images.IMG_ATMOSPHERE;
    case 'Clear':
      return Images.IMG_CLEAR;

    default:
      '';
  }
};

//location functions
export const requestLocationPermission = async () => {
  if (Platform.OS == 'android') {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      return permission;
    } catch (err) {
      // flashMessage('Location not provided', 'danger');
      return false;
    }
  } else {
    return true;
  }
};

export async function getGeoLocation(
  successCallBack: (loc: {lat: number; lon: number}) => void,
  errorCallback?: (err: Geolocation.GeoError) => void,
) {
  try {
    Geolocation.getCurrentPosition(
      position => {
        let loc = {
          lat: Number(position?.coords?.latitude.toFixed(4)),
          lon: Number(position?.coords?.longitude.toFixed(4)),
        };
        if (successCallBack) successCallBack(loc);
      },
      err => {
        console.log('err >>', err);

        if (errorCallback) errorCallback(err);
      },
      {enableHighAccuracy: false, timeout: 9999, maximumAge: 20000},
    );
  } catch (err) {
    console.log('err >>', err);
  }
}
