import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import colors from '../../utility/colors';
import {Images} from '../../utility/imagePaths';
import {APP_PADDING_HORIZONTAL} from '../../styles/globalStyles';
import {FONT_FAMILY} from '../../styles/typography';
import Image from '../common/Image';
import RegularText from '../common/text/RegularText';

type NoInternetModalProps = {
  visible: boolean;
};
const NoInternetModal = ({visible}: NoInternetModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.mainContainer}>
        <Image source={Images.IMG_NO_INTERNET} />
        <RegularText style={styles.text}>
          {'Coudn’t connect to internet. please check your network settings.'}
        </RegularText>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: textScale(16),
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    marginTop: spacing.MARGIN_40,
    width: '74%',
    textAlign: 'center',
  },
});

export default NoInternetModal;
