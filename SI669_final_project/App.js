import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeScreen } from './Home';
import {CandidateScreen} from './candidateDetail'
import { NewsScreen } from './News';
import { DiscussionScreen } from './Discussion';

const HomeStack = createStackNavigator(
  {
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
    },
  },
  Poll: {
    screen: NewsScreen,
    navigationOptions: {
      tabBarLabel: 'Poll',
    },
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {
      tabBarLabel: 'News',
    },
  },
  Discussion: {
    screen: DiscussionScreen,
    navigationOptions: {
      tabBarLabel: 'Discussion',
    },
  },
});

const AppContainer = createAppContainer(MainTabs);
export default AppContainer;