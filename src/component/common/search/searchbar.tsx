import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import commonStyle, {
  APP_PADDING_HORIZONTAL,
} from '../../../styles/globalStyles';
import {spacing} from '../../../styles/spacing';
import colors from '../../../utility/colors';
import {Images} from '../../../utility/imagePaths';
import Image from '../../common/Image';
import TextInput from '../input/TextInput';

interface SearchBarProps {
  value: string;
  placeHolder: string;
  onChangeText: (text: string) => void;
  mainViewStyle?: StyleProp<ViewStyle>;
  rightComponent?: any;
  onPressSerchInput?: () => void;
  editable?: boolean;
  inputMainContainerstyle?: StyleProp<ViewStyle>;
}

const SearchBar = ({
  value,
  onChangeText,
  placeHolder,
  mainViewStyle,
  rightComponent,
  onPressSerchInput,
  editable,
  inputMainContainerstyle,
}: SearchBarProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPressSerchInput}
      style={[styles.mainContainer, mainViewStyle]}
      disabled={editable}>
      <TextInput
        value={value}
        placeHolder={placeHolder}
        onChangeText={onChangeText}
        leftComponent={
          <Image source={Images.IMG_SEARCH} style={styles.searchImage} />
        }
        isErrorPossible={true}
        inputContainerStyle={styles.inputContainerStyle}
        mainViewStyle={[styles.inputMainContainer, inputMainContainerstyle]}
        editable={editable}
      />
      {rightComponent && rightComponent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    backgroundColor: colors.WHITE,
    paddingBottom: spacing.PADDING_16,
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_16,
  },
  inputMainContainer: {
    width: '100%',
  },
  inputContainerStyle: {
    backgroundColor: colors.GREY_300,
    borderRadius: spacing.RADIUS_90,
    height: spacing.HEIGHT_48,
    borderColor: colors.GREY_300,
  },
  searchImage: {
    marginLeft: spacing.MARGIN_16,
  },
});

export default SearchBar;
