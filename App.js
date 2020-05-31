import * as React from 'react';

// Import

import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider, useSelector} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import authReducer from './store/reducers/auth';
import LoginScreen from "./screens/LoginScreen";

// Zmienne

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Funkcje

const App = () => {
  const isAuth = useSelector(state => !!state.auth.token);

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <NavigationContainer linking={LinkingConfiguration}>
        <Stack.Navigator>
          {isAuth ?
              <Stack.Screen name="Root" component={BottomTabNavigator} /> :
              <Stack.Screen name="Login Page" component={LoginScreen} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default function AppWrapper(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <Provider store={store}>
          <App/>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
