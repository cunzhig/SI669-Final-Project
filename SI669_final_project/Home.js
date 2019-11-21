
import React from 'react';
import {styles} from './Styles'
import {Timer} from './Timer'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';


 
export class HomeScreen extends React.Component {

 constructor(props){
    super(props);
    this.candidates = [
      {key:'a',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
      {key:'b',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
      {key:'c',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
      {key:'a',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
      {key:'b',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
      {key:'c',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
    ]
    
 }

 handleView(candidateToView){
   this.props.navigation.navigate('CandidateDetail',{
     homeScreen: this,
     candidate: candidateToView
   });
 }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Timer/>
        </View>
        {/*  */}


        <View style = {styles.candidatesContainer}>
          <FlatList
            horizontal
            data = {this.candidates}
            renderItem = {
              ({item}) => {
                return(
                  <TouchableOpacity 
                  style={styles.candidateStyle} 
                  activeOpacity={0.5}
                  onPress ={()=>{this.handleView(item)}}
                  >
                    <Image
                      source= {item.img}
                      style={styles.ImageIconStyle}
                    />
                    <View style={styles.SeparatorLine} />
                    <Text style={styles.TextStyle}> {item.lastname}</Text>
                </TouchableOpacity>

                );
              }
            }
          >

          </FlatList>
        </View>


        <View style = {styles.topnewsContainer}><Text>Top News</Text></View>
        <View style = {styles.topdisContainer}><Text>Top Discussion</Text></View>

        
        </View>
    );
  }
}
