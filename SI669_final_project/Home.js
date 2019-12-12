
import React from 'react';
import {styles} from './Styles'
import {Timer} from './Timer'
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Linking } from 'expo';
import { CheckBox} from 'react-native-elements';
import { Card, WingBlank, Button } from '@ant-design/react-native';
import firebase from 'firebase';
import '@firebase/firestore';
import {AsyncStorage} from 'react-native';

export class HomeScreen extends React.Component {

 constructor(props){
    super(props);

    let user = this.props.navigation.getParam('user', undefined);

    const db = firebase.firestore();
    this.discussionRef = db.collection('discussion');
    this.discussionRef.get().then(queryRef => {
        let newEntries = [];
        queryRef.forEach(docRef => {
            let docData = docRef.data();
            let newEntry = {
                tag: docData.tag,
                content: docData.content,
                up: docData.up,
                down: docData.down,
                authorKey: docData.authorKey,
                authorName: docData.authorName,
                key: docRef.id,
                isSelected:docData.isSelected
            }
            newEntries.push(newEntry);
        })
        this.setState({ discussionList: newEntries });
    });

    this.newsRef = db.collection('news');
    this.newsRef.get().then(queryRef => {
        let newEntries = [];
        queryRef.forEach(docRef => {
            let docData = docRef.data();
            let newEntry = {
                tag: docData.tag,
                title: docData.title,
                reporter: docData.reporter,
                img: docData.img,
                url: docData.url,
                key: docRef.id,
                isSelected:docData.isSelected
            }
            newEntries.push(newEntry);
        })
        this.setState({ newsList: newEntries });
    });



    this.state ={
      candidates:[
        {key:'Yang',lastname:"Yang",isSelected:false,img:require('./images/yang.jpg'),url:"https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html"},
        {key:'Trump',lastname:"Trump",isSelected:false,img:require('./images/trump.jpeg'),url:"https://www.cnn.com/2013/07/04/us/donald-trump-fast-facts/index.html"},
        {key:'Biden',lastname:"Biden",isSelected:false,img:require('./images/biden.png'),url:"https://www.cnn.com/2013/01/22/us/joe-biden-fast-facts/index.html"},
        {key:'Harris',lastname:"Harris",isSelected:false,img:require('./images/harris.jpg'),url:"https://www.cnn.com/2019/01/28/us/kamala-harris-fast-facts/index.html"},
        {key:'Sanders',lastname:"Sanders",isSelected:false,img:require('./images/Sanders.png'),url:"https://www.cnn.com/2015/05/27/us/bernie-sanders-fast-facts/index.html"},
        {key:'Warren',lastname:"Warren",isSelected:false,img:require('./images/Warren.png'),url:"https://www.cnn.com/2015/01/09/us/elizabeth-warren-fast-facts/index.html"},
        {key:'Buttigieg',lastname:"Buttigieg",isSelected:false,img:require('./images/Buttigieg.png'),url:"https://www.cnn.com/2019/04/19/us/pete-buttigieg-fast-facts/index.html"},
        {key:'Booker',lastname:"Booker",isSelected:false,img:require('./images/Booker.png'),url:"https://www.cnn.com/2019/02/14/us/cory-booker-fast-facts/index.html"},
        {key:'Klobuchar',lastname:"Klobuchar",isSelected:false,img:require('./images/Klobuchar.png'),url:"https://www.cnn.com/2019/02/18/us/amy-klobuchar-fast-facts/index.html"},
        {key:'Gabbard',lastname:"Gabbard",isSelected:false,img:require('./images/Gabbard.png'),url:"https://www.cnn.com/2019/01/30/us/tulsi-gabbard-fast-facts/index.html"},
      ],
      // discussionList:[
      //   {key:'0',type:"Discussion", tag:"Yang",content:"My whole family supports Yang", up:0, down:0,isSelected:false},
      //   {key:'1',type:"Discussion", tag:"Trump",content:"My whole family supports Trump", up:0, down:0,isSelected:false},
      //   {key:'2',type:"Discussion", tag:"Biden",content:"My whole family supports Biden", up:0, down:0,isSelected:false},
      //   {key:'3',type:"Discussion", tag:"Harris",content:"My whole family supports Harris", up:0, down:0,isSelected:false},
      // ],
      // newsList: [
      //   {key:'0',type:"News", tag:"Biden",title:"Why the Less Disruptive Health Care Option Could Be Plenty Disruptive", reporter:"Margot Sanger-Katz", img:require('./images/news_biden_2.jpg'),url:"https://www.nytimes.com/2019/12/03/upshot/public-option-medicare-for-all.html",isSelected:false},
      //   {key:'1',type:"News", tag:"Trump",title:"200,000 People Without Insurance May Apply for Free H.I.V.-Prevention Drugs", reporter:"Donald G. McNeil Jr.", img:require('./images/news_trump_1.jpg'),url:"https://www.nytimes.com/2019/12/03/health/truvada-prep-hiv-gilead.html",isSelected:false},
      //   {key:'2',type:"News", tag:"Yang",title:"Andrew Yang: Yes, Robots Are Stealing Your Job", reporter:"Andrew Yang", img:require('./images/news_yang_1.jpg'),url:"https://www.nytimes.com/2019/11/14/opinion/andrew-yang-jobs.html",isSelected:false},
      //   {key:'3',type:"News", tag:"Harris",title:"Kamala Harris Drops Out of 2020 Presidential Race", reporter:"ASTEAD W. HERNDON", img:require('./images/news_harris_1.jpg'),url:"https://www.nytimes.com/2019/12/03/us/politics/kamala-harris-campaign-drops-out.html",isSelected:false},
      //   {key:'4',type:"News", tag:"Harris",title:"Why Joe Biden Resonates With Blue-Collar Voters", reporter:"Hilary Swift for The New York Times", img:require('./images/news_biden_1.jpg'),isSelected:false},

      // ],
      user: user
    };


    console.log(this.state.user)
    AsyncStorage.setItem('userKey', user.key)
    AsyncStorage.setItem('userName', user.username)
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

  let newNews = [];
  for (n of this.state.newsList){
    if (n.tag == candidate.key){
      n.isSelected = !n.isSelected;
    }
    newNews.push(n);
  }

  this.setState({
    candidates:newCandidates,
    discussionList:newDiscussion,
    newsList:newNews,
  });
 }



  render() {
    const IMAGES = {
      image1: require('./images/news_biden_2.jpg'), // statically analyzed
      image2: require('./images/news_trump_1.jpg'), // statically analyzed
      image3: require('./images/news_yang_1.jpg'), // statically analyzed
      image4: require('./images/news_harris_1.jpg'), // statically analyzed
      image5: require('./images/news_biden_1.jpg'), // statically analyzed
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headContainer}>
            <Text style={styles.headText}>2020 Election</Text>
        </View>
      <View style={styles.bodyContainer}>
        <View style={styles.timerContainer}>
          <Timer/>
        </View>
        <View style={styles.candidatesContainer}>
        <View style={styles.SectionLine} />
          <FlatList
            horizontal
            data = {this.state.candidates}
            renderItem = {
              ({item}) => {
                return(
                  <View style={{alignItems:'center'}}>
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
            <View>
                <FlatList
                  data = {this.state.newsList}
                  renderItem = {
                  ({item, index}) => {
                    console.log(item.img)
                    let img_address = "./images/"
                    return(
                      <View>
                          {item.isSelected ?   <TouchableOpacity
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
                            <Image source= {IMAGES['image' + (index+1)]}
                                  style={{ padding:10,height: 50,width: 50,resizeMode: 'stretch',flex:1}}
                            />
                            <Text style={{ marginLeft: 16 , flex: 4}}>{item.title}</Text>
                            </View>
                            </Card.Body>
                            </Card>
                          </WingBlank>
                        </TouchableOpacity> : null}
                      </View>


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
                    />
                    <Card.Body>
                        <View style={{ height: 42 , display: "flex", flexDirection: "column"}}>
                        <Text style={{ marginLeft: 16 , flex: 4}}>{item.content}</Text>
                        </View>
                    </Card.Body>
                    <Card.Footer content={item.authorName}/>
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
        </ScrollView>
    );
  }
}
