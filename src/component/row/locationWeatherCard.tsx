import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {APP_PADDING_HORIZONTAL} from '../../styles/globalStyles';
import {boxShadowTwo} from '../../styles/Mixins';
import {spacing} from '../../styles/spacing';
import {FONT_FAMILY, FONT_SIZE} from '../../styles/typography';
import colors from '../../utility/colors';
import {getWeatherColor} from '../../utility/commonFunction';
import {DEGREE_SIGN} from '../../utility/constants';
import {ACTION_TYPE} from '../../utility/types/generalType';
import RegularText from '../common/text/RegularText';
import Title from '../common/text/Title';

type LocationWeatherCardProps = {
  location: Record<string, any>;
  index: number;
  onPressLocationWeatherCard: (
    location: Record<string, any>,
    type?: ACTION_TYPE,
  ) => void;
};

const LocationWeatherCard = ({
  location,
  index,
  onPressLocationWeatherCard,
}: LocationWeatherCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.mainContainer,
        index === 0 && {marginTop: spacing.MARGIN_20},
        {backgroundColor: getWeatherColor(location?.weather[0]?.main)},
      ]}
      onPress={() => onPressLocationWeatherCard(location)}>
      <View style={styles.leftContainer}>
        <Title title={location?.name} style={styles.title} />
        <RegularText style={styles.text}>
          {location?.weather[0]?.main}
        </RegularText>
      </View>
      <View>
        <RegularText style={styles.tempText}>
          {Math.trunc(location?.main?.temp)}
          {DEGREE_SIGN}
        </RegularText>
        <RegularText style={styles.text}>
          {Math.trunc(location?.main?.temp_max)}
          {DEGREE_SIGN}/{Math.trunc(location?.main?.temp_min)}
          {DEGREE_SIGN}
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: spacing.MARGIN_16,
    padding: spacing.PADDING_16,
    borderRadius: spacing.RADIUS_10,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    ...boxShadowTwo(colors.GREY_300),
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: FONT_SIZE.MEDIUM,
    color: colors.WHITE,
  },
  text: {
    fontFamily: FONT_FAMILY.PRIMARY_REGULAR,
    fontSize: FONT_SIZE.NORMAL,
    color: colors.WHITE,
  },
  tempText: {
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: colors.WHITE,
  },
});

export default LocationWeatherCard;
