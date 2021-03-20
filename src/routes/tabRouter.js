import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/homeScreen';
import ChatScreen from '../screens/chatScreen';

const Tab = createMaterialBottomTabNavigator();

const TabRouter = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Chat' component={ChatScreen} />
        </Tab.Navigator>
    );
};

export default TabRouter;
