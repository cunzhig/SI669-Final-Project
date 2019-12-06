import React from 'react';
import {styles} from './Styles'
import { View, Button, CameraRoll, Text } from 'react-native';

export class SettingScreen extends React.Component {
    constructor(props)  {
        super(props);

      }
    
        render() {
            return (
              <View style={styles.headContainer}>
            <Text style={styles.headText}>Profile</Text>
        </View>
            );
           }
}