import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { LoginScreen } from './Login'
import { HomeScreen } from './Home';
import { CandidateScreen } from './candidateDetail'
import { NewsScreen } from './News';
import { PollScreen } from './PollScreen';
import { DiscussionScreen } from './Discussion';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const HomeStack = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    CandidateDetail: CandidateScreen,

  },
  {
    initialRouteName: 'Home',
  }
);

const MainTabs = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-home`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
  Poll: {
    screen: PollScreen,
    navigationOptions: {
      tabBarLabel: 'Poll',
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-list`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {
      tabBarLabel: 'News',
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-paper`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
  Discussion: {
    screen: DiscussionScreen,
    navigationOptions: {
      tabBarLabel: 'Discussion',
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-chatboxes`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
});

const AppContainer = createAppContainer(MainTabs);
export default AppContainer;
