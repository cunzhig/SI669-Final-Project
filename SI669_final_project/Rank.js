import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';

export class RankScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search:'',
            rankList:[],
        };
    }

    updateSearch = search => {
        this.setState({ search:search });
    }; 

    handlePress = async () => {
        fetch('http://127.0.0.1:5000/rank/', {
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
       this.setState({ rankList:responseJson.res });
          })
          .catch((error) => {
            console.error(error);
          });
      }

    render(){
        const { search } = this.state;
        return(
            <View>
            <Text>Rank</Text>
            <Searchbar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                onIconPress={this.handlePress.bind(this)}
            />
            <FlatList
                data = {this.state.rankList}
                renderItem = {
                    ({item}) => {
                      return(
                        <View style={{alignItems:'center'}}>
                    <Text>{item}</Text>
                      </View>
                      );
                    }
                  }
            >

            </FlatList>
            </View>
        );
    }
}