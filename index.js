/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {name as appName} from './app.json';

Amplify.configure({...awsconfig,Analytics:{
    disabled: true,
}});
AppRegistry.registerComponent(appName, () => App);
