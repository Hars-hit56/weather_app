import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import commonStyle, {APP_PADDING_HORIZONTAL} from '../../styles/globalStyles';
import {spacing} from '../../styles/spacing';
import colors from '../../utility/colors';
import {Images} from '../../utility/imagePaths';
import {ACTION_TYPE} from '../../utility/types/generalType';
import Image from '../common/Image';
import LocationWeatherCard from '../row/locationWeatherCard';
import EmptyList from './EmptyList';
import RegularText from '../common/text/RegularText';
import {FONT_FAMILY} from '../../styles/typography';

type LocationWeatherListProps = {
  locations: Record<string, any>[];
  onPressLocationWeatherCard: (
    location: Record<string, any>,
    type?: ACTION_TYPE,
  ) => void;
  currentLocation: Record<string, number>;
};

const LocationWeatherList = ({
  locations,
  onPressLocationWeatherCard,

  currentLocation,
}: LocationWeatherListProps) => {
  const currentLoc = locations.find(
    item =>
      currentLocation &&
      item.coord.lat === currentLocation.lat &&
      item.coord.lon === currentLocation.lon,
  );

  const addedLocations = locations.filter(
    item =>
      !(
        currentLocation &&
        item.coord.lat === currentLocation.lat &&
        item.coord.lon === currentLocation.lon
      ),
  );

  return (
    <View>
      {currentLoc || addedLocations.length !== 0 ? (
        <>
          {currentLoc && (
            <View style={styles.container}>
              <RegularText style={styles.secontionTitle}>
                Current Location
              </RegularText>
              <LocationWeatherCard
                key={'currentLocation'}
                location={currentLoc}
                index={0}
                onPressLocationWeatherCard={onPressLocationWeatherCard}
              />
            </View>
          )}
          {addedLocations.length !== 0 && (
            <>
              <RegularText
                style={[
                  styles.secontionTitle,
                  {
                    marginTop: currentLoc
                      ? spacing.MARGIN_6
                      : spacing.MARGIN_20,
                  },
                ]}>
                Added Locations
              </RegularText>
              <SwipeListView
                data={addedLocations}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <LocationWeatherCard
                    key={
                      'LocationWeatherCard' +
                      item.coord.lon +
                      item.coord.lat +
                      index
                    }
                    location={item}
                    index={index}
                    onPressLocationWeatherCard={onPressLocationWeatherCard}
                  />
                )}
                stopLeftSwipe={1}
                keyExtractor={(item, index) =>
                  String(item.coord.lon + item.coord.lat + index)
                }
                ListEmptyComponent={<EmptyList msg="No location added yet" />}
                swipeToOpenPercent={20}
                renderHiddenItem={({item, index}) => (
                  <RenderDeleteBtn
                    key={'RenderDeleteBtn' + index}
                    index={index}
                    item={item}
                    onPressLocationWeatherCard={onPressLocationWeatherCard}
                  />
                )}
                rightOpenValue={-spacing.WIDTH_64}
              />
            </>
          )}
        </>
      ) : (
        <EmptyList msg="No location added yet" />
      )}
    </View>
  );
};

type RenderDeleteBtnProps = {
  index: number;
  item: Record<string, any>;
  onPressLocationWeatherCard: (
    location: Record<string, any>,
    type?: ACTION_TYPE,
  ) => void;
};
const RenderDeleteBtn = ({
  index,
  item,
  onPressLocationWeatherCard,
}: RenderDeleteBtnProps) => {
  return (
    <View
      style={[
        styles.hiddenItemContainer,
        index === 0 && {marginTop: spacing.MARGIN_20},
      ]}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onPressLocationWeatherCard(item, 'DELETE')}>
        <Image source={Images.IMG_DELETE} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.MARGIN_20,
  },
  secontionTitle: {
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
  },
  hiddenItemContainer: {
    flex: 1,
    ...commonStyle.flexDirectionRow,
    justifyContent: 'flex-end',
    marginBottom: spacing.MARGIN_16,
    marginHorizontal: APP_PADDING_HORIZONTAL,
  },
  deleteButton: {
    height: spacing.WIDTH_50,
    width: spacing.WIDTH_50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.RADIUS_90,
    backgroundColor: colors.RED_700,
  },
  deleteIcon: {
    tintColor: colors.WHITE,
  },
});

export default LocationWeatherList;
