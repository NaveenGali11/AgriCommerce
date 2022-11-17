import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation';

const App = () => {
  return (
    <SafeAreaView style={{flex : 1}}>
      <NavigationContainer>
        <PaperProvider theme={{
          dark : false,
        }}>
          <Navigator />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
