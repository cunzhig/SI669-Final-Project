
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
      {key:'e',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
      {key:'f',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
      {key:'g',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
      {key:'h',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
      {key:'i',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
      {key:'j',lastname:"Yang",education:"um",img:require('./images/yang.jpg')},
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
        <View style={styles.headContainer}>
            <Text style={styles.headText}>2020 Election</Text>
        </View>
      <View style={styles.bodyContainer}>
        <View style={styles.timerContainer}>
          <Timer/>
        </View>
        <View style = {styles.candidatesContainer}>
        <View style={styles.SectionLine} />
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
                    <Text style={styles.iconTextStyle}> {item.lastname}</Text>
                </TouchableOpacity>

                );
              }
            }
          >
          </FlatList>
        </View>


        <View style = {styles.sectionContainer}>
          <Text style = {styles.sectionTitle}>Top News</Text>
          <View style = {styles.sectionContent}>
            <View style={styles.SectionLine} />
          </View>
        </View>

        <View style = {styles.sectionContainer}>
          <Text style = {styles.sectionTitle}>Top Discussions</Text>
          <View style = {styles.sectionContent}>
            <View style={styles.SectionLine} />
          </View>
        </View>

        </View>
        </View>
    );
  }
}
