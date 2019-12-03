
import React from 'react';
import {styles} from './Styles'
import {Timer} from './Timer'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Linking } from 'expo';
import { CheckBox} from 'react-native-elements';
import { Card, WingBlank, Button } from '@ant-design/react-native';
import CollapsibleList from "react-native-collapsible-list";



export class HomeScreen extends React.Component {

 constructor(props){
    super(props);

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
      newsList: [
        {key:'0',type:"News", tag:"Biden",title:"Why the Less Disruptive Health Care Option Could Be Plenty Disruptive", reporter:"Margot Sanger-Katz", img:require('./images/news_biden_2.jpg'),url:"https://www.nytimes.com/2019/12/03/upshot/public-option-medicare-for-all.html"},
        {key:'1',type:"News", tag:"Trump",title:"200,000 People Without Insurance May Apply for Free H.I.V.-Prevention Drugs", reporter:"Donald G. McNeil Jr.", img:require('./images/news_trump_1.jpg'),url:"https://www.nytimes.com/2019/12/03/health/truvada-prep-hiv-gilead.html"},
        {key:'2',type:"News", tag:"Yang",title:"Andrew Yang: Yes, Robots Are Stealing Your Job", reporter:"Andrew Yang", img:require('./images/news_yang_1.jpg'),url:"https://www.nytimes.com/2019/11/14/opinion/andrew-yang-jobs.html"},
        {key:'3',type:"News", tag:"Harris",title:"Kamala Harris Drops Out of 2020 Presidential Race", reporter:"ASTEAD W. HERNDON", img:require('./images/news_harris_1.jpg'),url:"https://www.nytimes.com/2019/12/03/us/politics/kamala-harris-campaign-drops-out.html"},
        {key:'4',type:"News", tag:"Harris",title:"Why Joe Biden Resonates With Blue-Collar Voters", reporter:"Hilary Swift for The New York Times", img:require('./images/news_biden_1.jpg')},

      ]
    };
    
 

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
            <View style={styles.SectionLine} /></View>
            <View style={styles.bodyContainer}>
                <FlatList
                  data = {this.state.newsList}
                  renderItem = {
                  ({item}) => {
                    return(
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress ={()=>{this.handleView(item)}} >
                        <WingBlank size="lg">
                          <Card full>
                          <Card.Header
                            title={item.tag}
                            thumbStyle={{ width: 30, height: 30 }}
                            thumb='https://static01.nyt.com/newsgraphics/2019/10/24/2020-landing-page/ea8f17b8d6251f28d1fcc6243cfe20146164ebe6/headshots/biden.png'
                            extra={item.type}
                          />
                          <Card.Body>
                            <View style={{ height: 42 , display: "flex", flexDirection: "row"}}>
                            <Image source= {item.img}
                                  style={{ padding:10,height: 50,width: 50,resizeMode: 'stretch',flex:1}}
                            />
                            <Text style={{ marginLeft: 16 , flex: 4}}>{item.title}</Text>
                            </View>
                            </Card.Body>
                            </Card>
                          </WingBlank>
                        </TouchableOpacity>
                      );
                      }
                    }
                >
                </FlatList>
            </View>
        </View>

        <View style = {styles.sectionContainer}>
          <Text style = {styles.sectionTitle}>Top Discussions</Text>
          <View style = {styles.sectionContent}>
            <View style={styles.SectionLine} /></View>
          <View>
            <FlatList
            data = {this.state.discussionList}
            renderItem = {
              ({item}) => {
                return(
                  <View>
                    {item.isSelected == true ? 
                    <WingBlank size="lg">
                    <TouchableOpacity
            activeOpacity={0.5}
            onPress ={()=>{this.handleView(item)}}
            >
                    <Card full>
                    <Card.Header
                        title={item.tag}
                        thumbStyle={{ width: 30, height: 30 }}
                        thumb= "https://static01.nyt.com/newsgraphics/2019/10/24/2020-landing-page/96aa0cc35f2fd3a9358817a7350bc6eedaa9d956/headshots/yang.png"
                        extra={item.type}
                    />
                    <Card.Body>
                        <View style={{ height: 42 , display: "flex", flexDirection: "column"}}>
                        <Text style={{ marginLeft: 16 , flex: 4}}>{item.content}</Text>
                        </View>
                    </Card.Body>
                    <Card.Footer content="Sam"/>
                    </Card>
                    </TouchableOpacity>
                </WingBlank>
                     : null}
                  
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
