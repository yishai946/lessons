import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Students from '../screens/Students';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Students" component={Students} />
    </Tab.Navigator>
  );
}

export default Tabs
