import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/homeScreen';
import ChatListScreen from '../screens/chatListScreen';
import { windowWidth } from '../utils/Dimensions';

const Tab = createMaterialTopTabNavigator();

const TabRouter = () => {
    return (
        <Tab.Navigator
            backBehavior='initialRoute'
            initialLayout={windowWidth}
            tabBarPosition='bottom'
        >
            <Tab.Screen name='Home' component={HomeScreen} title='Profile' />
            <Tab.Screen name='Chat' component={ChatListScreen} />
        </Tab.Navigator>
    );
};

export default TabRouter;
