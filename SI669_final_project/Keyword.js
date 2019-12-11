import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import Cloud from 'react-native-word-cloud';
import randomColor from 'randomcolor';
import {styles} from './Styles'

export class KeywordScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search:'',
            keywordsArray:[],
        };
        //
        this.response = [{'word': 'yorkers discriminate new', 'weight': '166'}, {'word': 'ny don jr', 'weight': '104'}, {'word': 'good riddance trump', 'weight': '56'}, {'word': 'john eisenberg transcript', 'weight': '71'}, {'word': 'iowa tonight evolving', 'weight': '69'}, {'word': 'lets fight donald', 'weight': '83'}, {'word': 'odd beer beats', 'weight': '105'}, {'word': 'force tonight florescent', 'weight': '46'}];
    }

    updateSearch = search => {
        this.setState({ search:search });
    }; 

    updateResult= search =>{
        keywords  = []
        for (term of this.response){
            keywords.push({
                keyword:term['word'],
                frequency:Number(term['weight']),
                color:'rgba(0,0,0,0)'
            })
        }
        // console.log(keywords)
        this.setState({ keywordsArray:keywords });
        console.log(this.state.keywordsArray)

    };


    handlePress = async () => {
        fetch('http://10.0.0.178:5000/keyword/', {
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
    //    Alert.alert("success" + responseJson);
       // mapping
       keywords  = []
        for (term of responseJson){
            keywords.push({
                keyword:term['word'],
                frequency:Number(term['weight']),
                color:'rgba(0,0,0,0)'
            })
        }
        // console.log(keywords)
        this.setState({ keywordsArray:keywords });
        console.log(this.state.keywordsArray)


    //    this.setState({ result:responseJson });
          })
          .catch((error) => {
            console.error(error);
          });
      }

    render(){
        const keywordsArray = [   
        {
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
                <Text style={styles.headText}>Keywords</Text>
            <Searchbar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                onIconPress={this.handlePress.bind(this)}
            />
            {/* <View>
                <Searchbar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    onIconPress={this.updateResult}
                />
            </View> */}



            {/* <TouchableOpacity onPress={this.handlePress.bind(this)}>
                <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click me to see the name </Text>
            </TouchableOpacity> */}
            <View style = {styles.cloudContainer}>
            <Cloud keywords={this.state.keywordsArray} scale={280} largestAtCenter={true} drawContainerCircle={false}/>

            </View>

    
            </View>
        );
    }
}