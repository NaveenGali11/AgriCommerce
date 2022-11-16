import React from 'react';
import {Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
