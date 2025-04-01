import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import NoInternetModal from './component/modals/NoInternetModal';
import AppStack from './navigations';

function App() {
  const [isNetwork, setIsNetwork] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsNetwork(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1}}>
      <AppStack />
      <FlashMessage position="top" />
      <NoInternetModal visible={!isNetwork} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
