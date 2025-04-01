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
  SCREEN_ADD_LOCATION,
  SCREEN_LOCATION_WEATHER_DETAIL,
} from '../../../../utility/constants';
import {retrieveItem, storeItem} from '../../../../utility/customAsyncStorage';
import {ACTION_TYPE} from '../../../../utility/types/generalType';
import AppContainer from '../../../common/container/AppContainer';
import Header from '../../../common/header/Header';
import SearchBar from '../../../common/search/searchbar';
import LocationWeatherList from '../../../modules/LocationWeatherList';
import {boxShadowTwo} from '../../../../styles/Mixins';
import flashMessage from '../../../common/FlashAlert';

const Home = () => {
  const [location, setLocation] = useState('');
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

  const reqLocationPermission = async () => {
    let granted = await requestLocationPermission();
    if (PermissionsAndroid.RESULTS.GRANTED === granted) {
      getGeoLocation(loc => storeUserLocation(loc));
    }
  };

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
  return (
    <AppContainer
      backgroundColor={colors.APP_BACKGROUND}
      statusBarColor={colors.WHITE}>
      <View style={styles.headerContainer}>
        <Header title="Weather App" hideBack />
        <SearchBar
          onChangeText={setLocation}
          placeHolder="Enter Location"
          value={location}
          onPressSerchInput={onPressSearchInput}
          editable={false}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator style={{marginTop: spacing.MARGIN_20}} />
      ) : (
        <View style={{flex: 1}}>
          <LocationWeatherList
            locations={locationWeatherRes}
            onPressLocationWeatherCard={onPressLocationWeatherCard}
          />
        </View>
      )}
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    ...boxShadowTwo(),
  },
  addIcon: {
    tintColor: colors.BLACK,
  },
});

export default Home;
