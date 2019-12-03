
import React from 'react';
import {styles} from './Styles'
import {Timer} from './Timer'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Linking } from 'expo';
import { CheckBox} from 'react-native-elements';



export class HomeScreen extends React.Component {

 constructor(props){
    super(props);
    // this.candidates = [
    //   {key:'a',lastname:"Yang",education:"",isSelected:true,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
    //   {key:'b',lastname:"Trump",education:"",isSelected:false,img:require('./images/trump.jpeg'),url:"https://www.cnn.com/2013/07/04/us/donald-trump-fast-facts/index.html"},
    //   {key:'c',lastname:"Biden",education:"",isSelected:false,img:require('./images/biden.png'),url:"https://www.cnn.com/2013/01/22/us/joe-biden-fast-facts/index.html"},
    //   {key:'e',lastname:"Harris",education:"",isSelected:false,img:require('./images/harris.jpg'),url:"https://www.cnn.com/2019/01/28/us/kamala-harris-fast-facts/index.html"},
    //   {key:'f',lastname:"Yang",education:"um",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
    //   {key:'g',lastname:"Yang",education:"um",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
    //   {key:'h',lastname:"Yang",education:"um",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
    //   {key:'i',lastname:"Yang",education:"um",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
    //   {key:'j',lastname:"Yang",education:"um",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
    // ];
    this.state ={
      candidates:[
        {key:'Yang',lastname:"Yang",education:"",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
        {key:'Trump',lastname:"Trump",education:"",isSelected:false,img:require('./images/trump.jpeg'),url:"https://www.cnn.com/2013/07/04/us/donald-trump-fast-facts/index.html"},
        {key:'Biden',lastname:"Biden",education:"",isSelected:false,img:require('./images/biden.png'),url:"https://www.cnn.com/2013/01/22/us/joe-biden-fast-facts/index.html"},
        {key:'Harris',lastname:"Harris",education:"",isSelected:false,img:require('./images/harris.jpg'),url:"https://www.cnn.com/2019/01/28/us/kamala-harris-fast-facts/index.html"},
        {key:'f',lastname:"Yang",education:"um",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
        {key:'g',lastname:"Yang",education:"um",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
        {key:'h',lastname:"Yang",education:"um",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
        {key:'i',lastname:"Yang",education:"um",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
        {key:'j',lastname:"Yang",education:"um",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
      ],
      discussionList:[
        {key:'0',type:"Discussion", tag:"Yang",content:"My whole family supports Yang", up:0, down:0,isSelected:false},
        {key:'1',type:"Discussion", tag:"Trump",content:"My whole family supports Trump", up:0, down:0,isSelected:false},
        {key:'2',type:"Discussion", tag:"Biden",content:"My whole family supports Biden", up:0, down:0,isSelected:false},
        {key:'3',type:"Discussion", tag:"Harris",content:"My whole family supports Harris", up:0, down:0,isSelected:false},
      ],
    };
    
    // this.selectedCandidates = [
    //   {tag:"Yang",isSelected:true},
    //   {tag:"Trump",isSelected:false},
    //   {tag:"Biden",isSelected:false},
    //   {tag:"Harris",isSelected:false},
    // ]


   

 }

 handleView(candidateToView){
    Linking.openURL(candidateToView.url);
    this.props.onPress && this.props.onPress();
 }

 handleToggle(candidate){
  let newCandidates = [];
  for (c of this.state.candidates){
    if (c.key == candidate.key){
      c.isSelected = !c.isSelected;
    }
    newCandidates.push(c);
  }

  let newDiscussion = [];
  for (d of this.state.discussionList){
    if (d.tag == candidate.key){
      d.isSelected = !d.isSelected;
    }
    newDiscussion.push(d);
  }
  this.setState({
    candidates:newCandidates,
    discussionList:newDiscussion,
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
            data = {this.state.candidates}
            renderItem = {
              ({item}) => {
                return(
                  <View>
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
                <CheckBox
                containerStyle={styles.labelSelectCheckBoxContainer}
                checked={item.isSelected}
                onPress = {()=>{this.handleToggle(item)}}
                /> 
                </View>

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
            <FlatList
            data = {this.state.discussionList}
            renderItem = {
              ({item}) => {
                return(
                  <View>
                    {item.isSelected == true ? <Text> {item.content}</Text> : null}
                  
                  </View>
                  
                );
              }
            }
          >
          </FlatList>
          </View>
        </View>

        </View>
        </View>
    );
  }
}
