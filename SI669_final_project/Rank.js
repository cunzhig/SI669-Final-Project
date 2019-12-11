import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
// import TagCloud from 'react-tag-cloud';
// import randomColor from 'randomcolor';

export class RankScreen extends React.Component{
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


    handlePress = async () => {
        fetch('http://127.0.0.1:5000/rn/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "key": this.state.search
            })
      })
          .then((response) => response.json())
          .then((responseJson) => {
       Alert.alert("success" + responseJson);
       this.setState({ result:responseJson });
          })
          .catch((error) => {
            console.error(error);
          });
      }

    render(){
        const { search } = this.state;
        return(
            <View>
            <Text>Trend</Text>
            <Searchbar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                onIconPress={this.handlePress.bind(this)}
            />
            <Text>{this.state.result}</Text>
            <TouchableOpacity onPress={this.handlePress.bind(this)}>
     <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click me to see the name </Text>
    </TouchableOpacity>
            </View>
        );
    }
}