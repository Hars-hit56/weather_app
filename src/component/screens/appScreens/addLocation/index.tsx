import axios from 'axios';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {API_KEY, BASE_URL} from '../../../../apies/apiTypes';
import {APP_PADDING_HORIZONTAL} from '../../../../styles/globalStyles';
import {spacing} from '../../../../styles/spacing';
import {FONT_FAMILY, FONT_SIZE} from '../../../../styles/typography';
import colors from '../../../../utility/colors';
import {goBack} from '../../../../utility/commonFunction';
import {KEY_LOCATIONS} from '../../../../utility/constants';
import {retrieveItem, storeItem} from '../../../../utility/customAsyncStorage';
import AppContainer from '../../../common/container/AppContainer';
import SearchBar from '../../../common/search/searchbar';
import RegularText from '../../../common/text/RegularText';
import EmptyList from '../../../modules/EmptyList';
import SearchList from '../../../modules/SearchList';
import flashMessage from '../../../common/FlashAlert';

const AddLocation = () => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<Record<string, any>[]>([]);

  // Function to fetch location suggestions
  const fetchLocations = async (city: string) => {
    if (!city) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${BASE_URL}geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
      );
      setSuggestions(response.data);
    } catch (error) {
      flashMessage('Failed to fetch locations. Please try again.', 'danger');
      console.error('Error fetching locations:', error);
    } finally {
    }
  };

  // Called when user types in search bar
  const handleSearch = (text: string) => {
    setLocation(text);
    fetchLocations(text);
  };

  // Called when user selects a location
  const handleLocationSelect = async (
    selectedLocation: Record<string, any>,
  ) => {
    setLocation(selectedLocation.name);

    const payload = {
      lat: Number(selectedLocation.lat.toFixed(4)),
      lon: Number(selectedLocation.lon.toFixed(4)),
    };

    const previousLocations: Record<string, number>[] =
      (await retrieveItem(KEY_LOCATIONS)) || [];

    // Check if this location already exists
    const isDuplicate = previousLocations.some(
      location => location.lat === payload.lat && location.lon === payload.lon,
    );
    if (isDuplicate) {
      return onPressCancel();
    }
    // Add first location or new unique location
    const updatedLocations = [...previousLocations, payload];
    // Store updated locations in AsyncStorage
    await storeItem(KEY_LOCATIONS, updatedLocations);

    setSuggestions([]);
    onPressCancel();
  };

  const onPressCancel = () => {
    goBack();
  };

  return (
    <AppContainer backgroundColor={colors.APP_BACKGROUND}>
      <SearchBar
        onChangeText={handleSearch}
        placeHolder="Enter Location"
        value={location}
        mainViewStyle={styles.searchMainContainer}
        inputMainContainerstyle={{width: '80%'}}
        rightComponent={
          <RegularText style={styles.cancelBtn} onPress={onPressCancel}>
            Cancel
          </RegularText>
        }
      />

      {suggestions.length > 0 && (
        <View style={styles.container}>
          <SearchList
            suggestions={suggestions}
            handleLocationSelect={handleLocationSelect}
          />
        </View>
      )}
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  searchMainContainer: {
    backgroundColor: colors.APP_BACKGROUND,
    marginTop: spacing.MARGIN_10,
  },
  cancelBtn: {
    width: '20%',
    color: colors.THEME,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    fontSize: FONT_SIZE.MEDIUM,
  },
  container: {
    backgroundColor: colors.WHITE,
    padding: APP_PADDING_HORIZONTAL,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    marginTop: APP_PADDING_HORIZONTAL,
    borderRadius: spacing.RADIUS_20,
  },
});

export default AddLocation;
