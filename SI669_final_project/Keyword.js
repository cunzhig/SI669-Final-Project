import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import Cloud from 'react-native-word-cloud';
import randomColor from 'randomcolor';

export class KeywordScreen extends React.Component{
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
        fetch('http://10.0.0.144:5000/rn/', {
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
        const keywordsArray = [    {
            keyword: "word1",    // the actual keyword
            frequency: 123,      // the frequency of this keyword
            color: randomColor(),     // the color of the circle that shows this keyword
        },
        {
            keyword: "word2",    // the actual keyword
            frequency: 123,      // the frequency of this keyword
            color: randomColor(),     // the color of the circle that shows this keyword
        },
        {
            keyword: "word3",    // the actual keyword
            frequency: 123,      // the frequency of this keyword
            color: randomColor(),     // the color of the circle that shows this keyword
        },
        {
            keyword: "word4",    // the actual keyword
            frequency: 123,      // the frequency of this keyword
            color:  randomColor(),    // the color of the circle that shows this keyword
        }];
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

    <Cloud keywords={keywordsArray} scale={250} largestAtCenter={true} drawContainerCircle={false}/>
            </View>
        );
    }
}