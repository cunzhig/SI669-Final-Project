import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { TagCloud } from 'react-tagcloud'
// import randomColor from 'randomcolor';

export class TrendScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search:'',
            result:'',
        };
    }

    updateSearch = search => {
        this.setState({ search:search });
    }; 

    updateResult= search =>{
        this.setState({ result:"result" });
    };

    render(){
        const { search } = this.state;
        return(
            <View>
            <Text>Trend</Text>
            <Searchbar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                onIconPress={this.updateResult}
            />
            <Text>{this.state.result}</Text>
            </View>
        );
    }
}