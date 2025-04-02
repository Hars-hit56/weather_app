import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  StyleSheet,
  View,
} from 'react-native';
import {API_KEY, BASE_URL} from '../../../../apies/apiTypes';
import {boxShadowTwo} from '../../../../styles/Mixins';
import {spacing} from '../../../../styles/spacing';
import colors from '../../../../utility/colors';
import {
  getGeoLocation,
  navigate,
  requestLocationPermission,
} from '../../../../utility/commonFunction';
import {
  COMMON_ERROR_MESSAGE,
  KEY_LOCATIONS,
  KEY_GEO_LOCATION,
  SCREEN_ADD_LOCATION,
  SCREEN_LOCATION_WEATHER_DETAIL,
} from '../../../../utility/constants';
import {retrieveItem, storeItem} from '../../../../utility/customAsyncStorage';
import {ACTION_TYPE} from '../../../../utility/types/generalType';
import AppContainer from '../../../common/container/AppContainer';
import flashMessage from '../../../common/FlashAlert';
import Header from '../../../common/header/Header';
import SearchBar from '../../../common/search/searchbar';
import VirtualizedView from '../../../common/View/VirtualizedView';
import LocationWeatherList from '../../../modules/LocationWeatherList';

const Home = () => {
  const [geolocation, setGeoLocation] = useState<Record<string, number>>({});
  const [locationWeatherRes, setLocationWeatherRes] = useState<
    Record<string, any>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchAsyncLocation();
    }, []),
  );

  useEffect(() => {
    reqLocationPermission();
  }, []);

  // Geo Location Permission
  const reqLocationPermission = async () => {
    let granted = await requestLocationPermission();

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getGeoLocation(async loc => {
        storeUserLocation(loc);
        await storeItem(KEY_GEO_LOCATION, loc);
      });
    } else if (
      granted === PermissionsAndroid.RESULTS.DENIED ||
      granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      const geoLoc = await retrieveItem(KEY_GEO_LOCATION);
      if (geoLoc) setGeoLocation(geoLoc);
    }
  };

  // Fetching data from api
  const fetchAsyncLocation = async () => {
    setIsLoading(true);
    const previousLocations: Record<string, number>[] = await retrieveItem(
      KEY_LOCATIONS,
    );
    if (!previousLocations || previousLocations.length === 0) {
      return setIsLoading(false);
    }
    try {
      const weatherData = await Promise.all(
        previousLocations.map(async location => {
          const response = await axios.get(
            `${BASE_URL}data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`,
          );

          return response.data;
        }),
      );
      if (weatherData) {
        setLocationWeatherRes(weatherData);
      } else {
        flashMessage(COMMON_ERROR_MESSAGE, 'danger');
      }
    } catch (error) {
      flashMessage(COMMON_ERROR_MESSAGE, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const storeUserLocation = async (location: Record<string, number>) => {
    setGeoLocation(location);
    const previousLocations: Record<string, number>[] =
      (await retrieveItem(KEY_LOCATIONS)) || [];

    const isDuplicate = previousLocations.some(
      loc => loc.lat === location.lat && loc.lon === location.lon,
    );

    if (!isDuplicate) {
      const updatedLocations = [...previousLocations, location];
      await storeItem(KEY_LOCATIONS, updatedLocations);
    }
    fetchAsyncLocation();
  };

  const onPressSearchInput = () => {
    navigate(SCREEN_ADD_LOCATION);
  };

  //Navigating to detail Page and delete functionality
  const onPressLocationWeatherCard = async (
    location: Record<string, any>,
    type?: ACTION_TYPE,
  ) => {
    if (type === 'DELETE') {
      const previousLocations: Record<string, number>[] =
        (await retrieveItem(KEY_LOCATIONS)) || [];
      const updatedData = previousLocations.filter(
        item =>
          item?.lat !== location?.coord?.lat &&
          item?.lon !== location?.coord?.lon,
      );
      const filteredLocationWeatherRes = locationWeatherRes.filter(
        item =>
          item?.coord?.lat !== location?.coord?.lat &&
          item?.coord?.lon !== location?.coord?.lon,
      );
      setLocationWeatherRes(filteredLocationWeatherRes);
      if (updatedData.length !== previousLocations.length) {
        await storeItem(KEY_LOCATIONS, updatedData);
      }
    } else {
      navigate(SCREEN_LOCATION_WEATHER_DETAIL, {location: location});
    }
  };
  //refetch data
  function onReferesh() {
    fetchAsyncLocation();
  }
  return (
    <AppContainer
      backgroundColor={colors.APP_BACKGROUND}
      statusBarColor={colors.WHITE}>
      <View style={styles.headerContainer}>
        <Header title="Weather App" hideBack />
        <SearchBar
          onChangeText={() => {}}
          placeHolder="Enter Location"
          value={''}
          onPressSerchInput={onPressSearchInput}
          editable={false}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator style={{marginTop: spacing.MARGIN_20}} />
      ) : (
        <VirtualizedView
          style={{flex: 1}}
          onRefresh={() => onReferesh()}
          refreshing={false}>
          <LocationWeatherList
            locations={locationWeatherRes}
            onPressLocationWeatherCard={onPressLocationWeatherCard}
            currentLocation={geolocation}
          />
        </VirtualizedView>
      )}
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.WHITE,
    ...boxShadowTwo(),
  },
  addIcon: {
    tintColor: colors.BLACK,
  },
});

export default Home;
