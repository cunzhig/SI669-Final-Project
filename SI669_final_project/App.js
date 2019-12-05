import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { LoginScreen } from './Login'
import { HomeScreen } from './Home';
import { CandidateScreen } from './candidateDetail'
import { NewsScreen } from './News';
import { PollScreen } from './Poll';
import { DiscussionScreen } from './Discussion';
import { DiscussionDetailScreen } from './DiscussionDetail';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const DiscussionStack = createStackNavigator(
  {
    Discussion: DiscussionScreen,
    DiscussionDetail: DiscussionDetailScreen,
  },
  {
    initialRouteName: 'Discussion',
  }
);

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
);

const PollStack = createStackNavigator(
  {
    Poll: PollScreen,
  },
);

const NewsStack = createStackNavigator(
  {
    News: NewsScreen,
  },
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
    screen: PollStack,
    navigationOptions: {
      tabBarLabel: 'Poll',
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-list`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
  News: {
    screen: NewsStack,
    navigationOptions: {
      tabBarLabel: 'News',
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-paper`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
  Discussion: {
    screen: DiscussionStack,
    navigationOptions: {
      tabBarLabel: 'Discussion',
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-chatboxes`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
});

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
);

const AppSwitch = createSwitchNavigator(
  {
    Login: AuthStack,
    Main: MainTabs,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(AppSwitch);
export default AppContainer;
