import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './Home';
import {CandidateScreen} from './candidateDetail'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    CandidateDetail: CandidateScreen,
  },
  {
    initialRouteName: 'Home',
  }
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;