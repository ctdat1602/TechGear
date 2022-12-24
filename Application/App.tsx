import { StyleSheet, StatusBar, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from '~/navigation/AppNavigator'
import store from '~/store';
import { Provider } from 'react-redux';
import { initOneSignal } from '~/utils/oneSignal';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  useEffect(() => {
    initOneSignal();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" translucent />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})