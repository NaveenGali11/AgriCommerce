import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation';
import {withAuthenticator,AmplifyTheme} from "aws-amplify-react-native";

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


const customTheme = {
  ...AmplifyTheme,
  button : {
    ...AmplifyTheme.button,
    backgroundColor:"#6B911B",
  },
  sectionFooterLink :{
    ...AmplifyTheme.sectionFooterLink,
    color : "#6B911B"
  },
  container : {
    ...AmplifyTheme.container,
    color : "#6B911B"
  },
  buttonDisabled : {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor:"#6B911B"
  }
}


// export default App;
export default withAuthenticator(App,{theme: customTheme});
