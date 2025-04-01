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

type LocationWeatherListProps = {
  locations: Record<string, any>[];
  onPressLocationWeatherCard: (
    location: Record<string, any>,
    type?: ACTION_TYPE,
  ) => void;
};

const LocationWeatherList = ({
  locations,
  onPressLocationWeatherCard,
}: LocationWeatherListProps) => {
  return (
    <View>
      <SwipeListView
        data={locations || []}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <LocationWeatherCard
            key={
              'LocationWeatherCard' + item.coord.lon + item.coord.lat + index
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
