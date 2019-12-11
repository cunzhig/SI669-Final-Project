import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { LoginScreen } from './Login'
import { HomeScreen } from './Home';
import { CandidateScreen } from './candidateDetail'
import { NewsScreen } from './News';
import { PollScreen } from './Poll';
import { DiscussionScreen } from './Discussion';
import { DiscussionDetailScreen } from './DiscussionDetail';
import { KeywordScreen } from './Keyword'
import { RankScreen } from './Rank'
import { SettingScreen } from './Settings'
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

const KeywordStack = createStackNavigator(
  {
    Keyword: KeywordScreen,
  },
);

const RankStack = createStackNavigator(
  {
    Rank: RankScreen,
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
  // Trend: {
  //   screen: TrendStack,
  //   navigationOptions: {
  //     tabBarLabel: 'Trend',
  //     tabBarIcon: ({ focused, tintColor }) => {
  //       const iconName = `ios-chatboxes`;
  //       return <Ionicons name={iconName} size={25} color={tintColor} />;
  //     },
  //   },
  // },
});

const TrendTabs = createBottomTabNavigator({
  Keyword: {
    screen: KeywordStack,
    navigationOptions: {
      tabBarLabel: 'Keyword',
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `md-flame`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },
  Rank: {
    screen: RankStack,
    navigationOptions: {
      tabBarLabel: 'Rank',
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `md-pulse`;
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    },
  },}
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
);

const MainDrawers = createDrawerNavigator(
  {
    Main: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-home" style={{ color: tintColor }} />
        ),
        drawerLabel: "Main"
      },
      screen: MainTabs
    },

    Trend: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-trending-up" style={{ color: tintColor }} />
        ),
        drawerLabel: "Trend"
      },
      screen: TrendTabs
    },

    Settings: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-settings" style={{ color: tintColor }} />
        ),
        drawerLabel: "Settings"
      },
      screen: SettingScreen
    },
  }
)

const AppSwitch = createSwitchNavigator(
  {
    Login: AuthStack,
    Draw: MainDrawers,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(AppSwitch);
export default AppContainer;
