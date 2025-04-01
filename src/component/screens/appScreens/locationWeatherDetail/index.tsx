import {StyleSheet, View} from 'react-native';
import {APP_PADDING_HORIZONTAL} from '../../../../styles/globalStyles';
import {spacing} from '../../../../styles/spacing';
import {FONT_FAMILY, FONT_SIZE} from '../../../../styles/typography';
import colors from '../../../../utility/colors';
import {
  getWeatherColor,
  getWeatherIcon,
} from '../../../../utility/commonFunction';
import {DEGREE_SIGN} from '../../../../utility/constants';
import {Images} from '../../../../utility/imagePaths';
import AppContainer from '../../../common/container/AppContainer';
import Image from '../../../common/Image';
import RegularText from '../../../common/text/RegularText';

const LocationWeatherDetail = ({route}: any) => {
  const {params} = route;

  const getTime = (time: number) => {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const WEATHER_DATA = [
    {
      label: 'Pressure',
      value: params?.location?.main?.pressure,
      icon: Images.IMG_PRESSURE_METER,
    },
    {
      label: 'Humidity',
      value: params?.location?.main?.humidity + '%',
      icon: Images.IMG_HUMIDITY_METER,
    },
    {
      label: 'Speed',
      value: params?.location?.wind?.speed,
      icon: Images.IMG_SPEED_METER,
    },
    {
      label: 'Sunset',
      value: getTime(params?.location?.sys?.sunset),
      icon: Images.IMG_SUNSET,
    },
  ];

  return (
    <AppContainer
      backgroundColor={getWeatherColor(params?.location?.weather[0].main)}
      barStyle="light-content">
      <View style={styles.seconderyContainer}>
        <View style={styles.tempContainer}>
          <View>
            <RegularText style={styles.cityName}>
              {params?.location?.name}
            </RegularText>
            <RegularText style={styles.tempText}>
              {Math.trunc(params?.location?.main?.temp)}
              {DEGREE_SIGN}
            </RegularText>
            <RegularText style={styles.text}>
              {params?.location?.weather[0]?.main}{' '}
              {Math.trunc(params?.location?.main?.temp_max)}
              {DEGREE_SIGN}/{Math.trunc(params?.location?.main?.temp_min)}
              {DEGREE_SIGN}
            </RegularText>
          </View>
          <Image
            source={getWeatherIcon(params?.location?.weather[0]?.main)}
            viewStyle={{justifyContent: 'center'}}
          />
        </View>
      </View>
      <View style={styles.gridContainer}>
        {WEATHER_DATA.map((item, index) => (
          <WeatherMetricsCard item={item} key={'WEATHER_DATA' + index} />
        ))}
      </View>
    </AppContainer>
  );
};

type WeatherMetricsCardProps = {
  item: Record<string, string>;
};
const WeatherMetricsCard = ({item}: WeatherMetricsCardProps) => {
  return (
    <View style={styles.weatherMetricsCardContainer}>
      <RegularText style={styles.label}>{item.label}</RegularText>
      <RegularText style={styles.metricText}>{item.value}</RegularText>
      <Image source={item.icon} style={styles.meterIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},

  seconderyContainer: {
    marginTop: spacing.MARGIN_100,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    flex: 1,
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cityName: {
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: colors.WHITE,
  },
  tempText: {
    color: colors.WHITE,
    fontFamily: FONT_FAMILY.PRIMARY_LIGHT,
    fontSize: FONT_SIZE.DOUBLE_EXTRA_LARGE,
  },
  text: {
    color: '#F5F5F5',
    fontFamily: FONT_FAMILY.PRIMARY_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.MARGIN_16,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    marginBottom: spacing.MARGIN_16,
  },
  weatherMetricsCardContainer: {
    borderRadius: spacing.MARGIN_20,
    padding: APP_PADDING_HORIZONTAL,
    backgroundColor: colors.TRANSPARENT_BLACK,
    width: '47.6%',
  },
  label: {
    color: '#F5F5F5',
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    fontSize: FONT_SIZE.SEMI_MEDIUM,
  },
  metricText: {
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    fontSize: FONT_SIZE.TITLE,
    color: colors.WHITE,
    marginTop: spacing.MARGIN_4,
  },
  meterIcon: {
    marginTop: spacing.MARGIN_10,
    alignSelf: 'flex-end',
  },
});

export default LocationWeatherDetail;
