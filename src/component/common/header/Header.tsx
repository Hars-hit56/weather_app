import React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {APP_PADDING_HORIZONTAL} from '../../../styles/globalStyles';
import {boxShadowTwo} from '../../../styles/Mixins';
import {spacing} from '../../../styles/spacing';
import {FONT_FAMILY, FONT_SIZE} from '../../../styles/typography';
import colors from '../../../utility/colors';
import BackButton from '../button/BackButton';
import Title from '../text/Title';

interface HeaderProps {
  backText?: string;
  hideBack?: boolean;
  backgroundColor?: ColorValue;
  backArrowTintColor?: ColorValue;
  onPressBack?: () => void;
  title?: string;
  rightComponent?: any;
  mainContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  leftComponent?: any;
  showShadow?: boolean;
}

const Header = ({
  backText,
  backgroundColor,
  mainContainerStyle,
  rightComponent,
  hideBack,
  backArrowTintColor,
  onPressBack,
  title,
  leftComponent,
  titleStyle,
  showShadow,
}: HeaderProps) => {
  return (
    <View
      style={[
        styles.mainContainer,
        showShadow && boxShadowTwo(colors.BLACK),
        {
          backgroundColor: backgroundColor ? backgroundColor : colors.WHITE,
        },
        mainContainerStyle,
      ]}>
      {hideBack == true ? (
        leftComponent && leftComponent
      ) : (
        <BackButton
          text={backText || ' '}
          backArrowTintColor={backArrowTintColor || colors.BLACK}
          onBack={onPressBack}
        />
      )}
      <Title title={title || ''} style={[styles.title, titleStyle]} />

      {rightComponent && rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingVertical: spacing.PADDING_12,
    minHeight: spacing.HEIGHT_58,
    gap: spacing.MARGIN_10,
  },
  title: {
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    color: colors.BLACK,
    fontSize: FONT_SIZE.EXTRA_LARGE,
  },
});

export default Header;
