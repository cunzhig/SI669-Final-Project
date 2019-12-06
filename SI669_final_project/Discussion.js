import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert, Switch } from 'react-native';
import { Card, WingBlank, Button } from '@ant-design/react-native';
import { styles } from './Styles'
import { Ionicons } from '@expo/vector-icons';
import { Icon, ButtonGroup } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase';
import '@firebase/firestore';
import { AsyncStorage } from 'react-native';
import  UserAvatar  from 'react-native-user-avatar';

export class DiscussionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHide: false,
            isSort: false,
            selectedIndex: 0
        }

        AsyncStorage.getItem('userKey', (err, result) => {
            console.log(result);
            this.setState({ userKey: result })
        });
        AsyncStorage.getItem('userName', (err, result) => {
            console.log(result);
            this.setState({ userName: result })
        });

        const db = firebase.firestore();
        this.entriesRef = db.collection('discussion');
        this.entriesRef.get().then(queryRef => {
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
                }
                newEntries.push(newEntry);
            })
            this.setState({ discussionList: newEntries });
        });

        this.updateIndex = this.updateIndex.bind(this)
        this.state = {
            // discussionList:[
            //     {key:'0',tag:"Yang",content:"My whole family supports Yang", up:0, down:0, name: "Sam", img:require('./images/yang.jpg') },
            //     {key:'1',tag:"Biden",content:"My whole family supports Biden ", up:0, down:0, name: "Marry", img:require('./images/biden.png') },
            //     {key:'2',tag:"Trump",content:"My whole family supports Trump", up:0, down:0, name: "Ben", img:require('./images/trump.jpeg') },
            //     {key:'3',tag:"Harris",content:"My whole family supports Harris", up:0, down:0, name: "Amy", img:require('./images/trump.jpeg') },
            //   ],
        }

        console.log(this.state.userKey)
    }

    updateIndex (selectedIndex) {
        let newEntries = this.state.discussionList.slice()
        if (selectedIndex == 1){
            newEntries.sort((a,b) => (a.up > b.up) ? -1 : ((a.up < b.up) ? 1 : 0))
        }
        if (selectedIndex == 2){
            newEntries.sort((a,b) => (a.down > b.down) ? -1 : ((a.down < b.down) ? 1 : 0))
        }
        this.setState({discussionList:newEntries})
      this.setState({selectedIndex})
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

    handleView(item) {

    }

    addEntry(newEntry) {
        this.entriesRef.add(newEntry).then(docRef => {
            newEntry.key = docRef.id;
            let newEntries = this.state.discussionList.slice(); // clone the list
            newEntries.push(newEntry);
            this.setState({ discussionList: newEntries });
        })
    }

    deleteEntry(entryToDelete) {
        let entryKey = entryToDelete.key;
        this.entriesRef.doc(entryKey).delete().then(() => {
            let newEntries = [];
            for (entry of this.state.discussionList) {
                if (entry.key !== entryKey) {
                    newEntries.push(entry);
                }
            }
            this.setState({ discussionList: newEntries });
        });
    }

    updateEntry(entryToUpdate) {
        this.entriesRef.doc(entryToUpdate.key).set({
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
            // if (this.state.isSort) {
            //     newEntries.sort((a, b) => (a.priority > b.priority) ? -1 : ((a.priority < b.priority) ? 1 : 0))
            // }
            this.setState({ discussionList: newEntries});
        });
    }

    handleDelete(entryToDelete) {
        this.deleteEntry(entryToDelete);
    }

    handleEdit(entryToEdit) {
        this.props.navigation.navigate('DiscussionDetail', {
            entry: entryToEdit,
            discussionScreen: this
        });
    }

    handleSwitchHide() {
        // let newEntries = [];
        // for (entry of this.state.discussionList) {
        //   newEntries.push(entry);
        // }
        let newEntries = this.state.discussionList.slice()
        this.setState({isHide: !this.state.isHide, discussionList:newEntries})
      }
    
    handleSwitchSort() {
        let newEntries = this.state.discussionList.slice()
        if (this.state.selectedIndex == 1){
            newEntries.sort((a,b) => (a.up > b.up) ? -1 : ((a.up < b.up) ? 1 : 0))
        }
        if (this.state.selectedIndex == 2){
            newEntries.sort((a,b) => (a.down > b.down) ? -1 : ((a.down < b.down) ? 1 : 0))
        }
        this.setState({discussionList:newEntries})
    }

    render() {
        const root = this;
        const buttons = ['Time', 'Ups', 'Downs']
        const selectedIndex = this.state.selectedIndex
        return (
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <Text style={styles.headText}>Discussion</Text>
                </View>
                <View style={styles.headerFunctionContainer}>
                  <View style={styles.headerFunctions}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>My posts</Text>
                    <Switch style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                    onChange = {() => this.handleSwitchHide()}
                    value = {this.state.isHide}
                    />

                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>New post</Text>
                    <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('DiscussionDetail', { discussionScreen: this });
                    }}>
                      <Icon
                          reverse
                          name='plus'
                          type='font-awesome'
                          color='#517fa4'
                          size={16}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.headerFunctions}>
                    <Text style={{fontWeight: 'bold'}}>Sort by: </Text>
                    <ButtonGroup
                      onPress={this.updateIndex}
                      selectedIndex={selectedIndex}
                      buttons={buttons}
                      containerStyle={{height: 25, width: 250}}
                    />
                  </View>
                </View>
                <View style={styles.bodyContainer}>
                    <FlatList
                        data={this.state.discussionList}
                        renderItem={
                            ({ item }) => {
                                const isAuthor = (root.state.userKey == item.authorKey)
                                console.log(isAuthor)
                                return (
                                    <View>
                                        {
                                            root.state.isHide && !isAuthor ? null
                                            :
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
                                        }
                                    </View>
                                );
                            }
                        }
                    >
                    </FlatList>
                </View>
            </View>
        );
    }


}
