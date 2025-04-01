import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  ColorValue,
  SafeAreaView,
  StatusBarStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {changeStatusBarColor} from '../../../utility/commonFunction';
import colors from '../../../utility/colors';

type AppContainerProps = {
  statusBarColor?: ColorValue;
  barStyle?: StatusBarStyle;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  backgroundColor?: ColorValue;
};

function AppContainer({
  statusBarColor,
  barStyle,
  style,
  children,
  backgroundColor,
}: AppContainerProps) {
  useFocusEffect(() => {
    changeStatusBarColor(
      statusBarColor || backgroundColor || colors.THEME,
      barStyle || 'dark-content',
    );
  });

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: backgroundColor || colors.THEME}}>
        <View
          style={[
            {flex: 1},
            {backgroundColor: backgroundColor || colors.WHITE},
            style,
          ]}>
          {children}
        </View>
      </SafeAreaView>
    </>
  );
}

export default AppContainer;
