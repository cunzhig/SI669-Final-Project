import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './Styles';

export class CandidateScreen extends React.Component{
    constructor(props){
        super(props);
        this.candidate = this.props.navigation.getParam('candidate');
        this.homeScreen = this.props.navigation.getParam('homeScreen');
    }

    render(){
        return(
            <View>
                <Text>{this.candidate.lastname}</Text>
            </View>
            
        );
    }
}