import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                title: 'QR Codes',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-qr-scanner" />,
            }}
        />
        <BottomTab.Screen
            name="Links"
            component={LinksScreen}
            options={{
                title: 'Settings',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />,
            }}
        />
      </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'QRApp';
    case 'Links':
      return 'QRApp';
  }
}
