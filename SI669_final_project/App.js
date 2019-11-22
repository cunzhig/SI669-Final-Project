import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {LoginScreen} from './Login'
import { HomeScreen } from './Home';
import {CandidateScreen} from './candidateDetail'

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    CandidateDetail: CandidateScreen,
    
  },
  {
    initialRouteName: 'Login',
  }
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;