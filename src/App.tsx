import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AppStack from './navigations';
import FlashMessage from 'react-native-flash-message';

function App() {
  useEffect(() => {
    getLoginStatus();
  }, []);

  async function getLoginStatus() {
    try {
    } catch (err) {
    } finally {
    }
  }
  return (
    <View style={{flex: 1}}>
      <AppStack />
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
