
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
import  UserAvatar  from 'react-native-user-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

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
        console.log(newEntries);
        this.setState({ newsList: newEntries });
    });

    this.candidateRef = db.collection('candidates');
    this.candidateRef.get().then(queryRef => {
        let newEntries = [];
        queryRef.forEach(docRef => {
            let docData = docRef.data();
            let newEntry = {
                tag: docData.tag,
                url: docData.url,
                key: docRef.id,
                isSelected:docData.isSelected
            }
            newEntries.push(newEntry);
        })
        this.setState({ candidates: newEntries });
    });



    this.state ={
      user: user
    };

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
    if (c.tag == candidate.tag){
      c.isSelected = !c.isSelected;
    }
    newCandidates.push(c);
  }

  let newDiscussion = [];
  for (d of this.state.discussionList){
    if (d.tag == candidate.tag){
      d.isSelected = !d.isSelected;
    }
    newDiscussion.push(d);
  }

  let newNews = [];
  for (n of this.state.newsList){
    if (n.tag == candidate.tag){
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

 handleUp(item) {
  if (this.state.userKey == item.authorKey) {
      Alert.alert(
          'Alert',
          "You're not allowed to upvote for yourself",
          [
            {
              text: 'OK',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
  }
  else{
      let newDiscussionList = [];
      for (discussion of this.state.discussionList) {
          if (item.key === discussion.key) {
              if (discussion.up - discussion.upBack === 1){
                  discussion.up -= 1
                  newDiscussionList.push(discussion);
              }
              else{
                  discussion.upBack = discussion.up
                  discussion.up += 1
                  newDiscussionList.push(discussion);
              }
              this.updateEntry(discussion);
          } else {
              newDiscussionList.push(discussion);
          }
      }
      this.setState({
          discussionList: newDiscussionList
      })
  }
}

handleDown(item) {
  if (this.state.userKey == item.authorKey) {
      Alert.alert(
          'Alert',
          "You're not allowed to downvote for yourself",
          [
            {
              text: 'OK',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
  }
  else{
      let newDiscussionList = [];
      for (discussion of this.state.discussionList) {
          if (item.key === discussion.key) {
              if (discussion.down - discussion.downBack === 1){
                  discussion.down -= 1
                  newDiscussionList.push(discussion);
              }
              else{
                  discussion.downBack = discussion.down
                  discussion.down += 1
                  newDiscussionList.push(discussion);
              }
              this.updateEntry(discussion);
          } else {
              newDiscussionList.push(discussion);
          }
      }
      this.setState({
          discussionList: newDiscussionList
      })
  }
}

updateEntry(entryToUpdate) {
  this.discussionRef.doc(entryToUpdate.key).set({
  tag: entryToUpdate.tag,
  content: entryToUpdate.content,
  up: entryToUpdate.up,
  down: entryToUpdate.down,
  authorKey: entryToUpdate.authorKey,
  authorName: entryToUpdate.authorName,
  }).then(() => {
      let newEntries = [];
      for (entry of this.state.discussionList) {
          if (entry.key === entryToUpdate.key) {
              newEntries.push(entryToUpdate);
          } else {
              newEntries.push(entry);
          }
      }
      this.setState({ discussionList: newEntries});
  });
}

  render() {
    const IMAGES = {
      news_biden_2: require('./images/news_biden_2.jpg'), // statically analyzed
      news_trump_1: require('./images/news_trump_1.jpg'), // statically analyzed
      news_yang_1: require('./images/news_yang_1.jpg'), // statically analyzed
      news_harris_1: require('./images/news_harris_1.jpg'), // statically analyzed
      news_biden_1: require('./images/news_biden_1.jpg'), // statically analyzed
    }

    const Thumbs = {
      Biden: require('./images/Biden_thumb.png'),
      Trump: require('./images/Trump_thumb.jpg'),
      Yang: require('./images/Yang_thumb.png'),
      Harris: require('./images/Harris_thumb.jpg'),
    }

    const Candidate_IMAGES = {
      Yang: require('./images/yang.jpg'),
      Trump: require('./images/trump.jpeg'),
      Biden: require('./images/biden.png'),
      Harris: require('./images/harris.jpg'),
      Sanders: require('./images/Sanders.png'),
      Warren: require('./images/Warren.png')
    }

    const root = this;
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
                      source= {Candidate_IMAGES[item.tag]}
                      style={styles.ImageIconStyle}
                    />
                    <Text style={styles.iconTextStyle}> {item.tag}</Text>
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
                            thumb = {<Image source= {Thumbs[item.tag]}
                            style = {{width: 30, height: 30}}
                      />}
                            extra={item.type}
                          />
                          <Card.Body>
                            <View style={{ height: 42 , display: "flex", flexDirection: "row"}}>
                            <Image source= {IMAGES[item.img]}
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
                        data={this.state.discussionList}
                        renderItem={
                            ({ item }) => {
                                const isAuthor = (root.state.userKey == item.authorKey)
                                console.log(isAuthor)
                                return (
                                    <View>
                                        {
                                            item.isSelected  ?
                                            <WingBlank size="lg">
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                onPress={() => { this.handleView(item) }}>
                                                <Card full
                                                    style={{ marginTop: 20, marginBottom: 5 }}>
                                                    {/* <Card.Header
                                                        title={item.name}
                                                        thumbStyle={{ width: 30, height: 30 }}
                                                        thumb="https://static01.nyt.com/newsgraphics/2019/10/24/2020-landing-page/96aa0cc35f2fd3a9358817a7350bc6eedaa9d956/headshots/yang.png"
                                                        extra={item.tag}
                                                    /> */}
                                                    <Card.Body>
                                                        <View style={{ height: 42, display: "flex", flexDirection: "row" }}>
                                                        <UserAvatar size="24" name={item.authorName} />
                                                            <Text style={{ fontSize: 18, marginLeft: 6, flex: 4, justifyContent: 'center', alignItems: 'center'}}>{item.content}</Text>
                                                        </View>
                                                    </Card.Body>
                                                </Card>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start' }}>
                                                <TouchableOpacity
                                                    style={styles.updownButton}
                                                    onPress={() => { this.handleUp(item) }} >
                                                    <FontAwesomeIcon icon={faThumbsUp} size={15} color='#517fa4' />
                                                </TouchableOpacity>
                                                <Text style={{ flex: 1 }}>{item.up}</Text>
                                                <TouchableOpacity
                                                    style={styles.updownButton}
                                                    onPress={() => { this.handleDown(item) }} >
                                                    <FontAwesomeIcon icon={faThumbsDown} size={15} color='#517fa4' />
                                                </TouchableOpacity>
                                                <Text style={{ flex: 1 }}>{item.down}</Text>
                                                {
                                                    isAuthor ?
                                                        <View style={{flexDirection: 'row'}}>
                                                            <Icon
                                                                reverse
                                                                name='delete'
                                                                type='AntDesign'
                                                                color='#517fa4'
                                                                size={10}
                                                                onPress={() => { this.handleDelete(item) }}
                                                            />
                                                            <Icon
                                                                reverse
                                                                name='edit'
                                                                type='AntDesign'
                                                                color='#517fa4'
                                                                size={10}
                                                                onPress={() => { this.handleEdit(item) }}
                                                            />
                                                        </View>
                                                        : null
                                                }
                                            </View>
                                            <View>
                                            </View>
                                        </WingBlank>
                                        : null 
                                        }
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
