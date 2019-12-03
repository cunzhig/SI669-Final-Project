import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, WingBlank, Button } from '@ant-design/react-native';
import {styles} from './Styles'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export class DiscussionScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            discussionList:[
                {key:'0',tag:"Yang",content:"My whole family supports Yang", up:0, down:0, name: "Sam" },
                {key:'1',tag:"Yang",content:"My whole family supports Yang", up:0, down:0, name: "Sam" },
                {key:'2',tag:"Yang",content:"My whole family supports Yang", up:0, down:0, name: "Sam" },
                {key:'3',tag:"Yang",content:"My whole family supports Yang", up:0, down:0, name: "Sam" },
              ],
        }
     }

     handleUp(item){
        let newDiscussionList = [];
        for (discussion of this.state.discussionList) {
          if (item.key === discussion.key) {
              discussion.up += 1
              newDiscussionList.push(discussion);
          } else {
            newDiscussionList.push(discussion);
          }
        }
         this.setState({
            discussionList: newDiscussionList
         })

     }

     handleDown(item){
        let newDiscussionList = [];
        for (discussion of this.state.discussionList) {
          if (item.key === discussion.key) {
              discussion.down += 1
              newDiscussionList.push(discussion);
          } else {
            newDiscussionList.push(discussion);
          }
        }
         this.setState({
            discussionList: newDiscussionList
         })
     }

     handleView(item){

     }

     render(){
     return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <Text style={styles.headText}>Discussion</Text>
            </View>
            <View style={styles.bodyContainer}>
                <FlatList
                    data = {this.state.discussionList}
                    renderItem = {
                    ({item}) => {
                        return(
                            <WingBlank size="lg">
                                <TouchableOpacity
                                activeOpacity={0.5}
                                onPress ={()=>{this.handleView(item)}}>
                                <Card full
                                style={ {marginTop: 20, marginBottom: 5} }>
                                <Card.Header
                                    title={item.name}
                                    thumbStyle={{ width: 30, height: 30 }}
                                    thumb= "https://static01.nyt.com/newsgraphics/2019/10/24/2020-landing-page/96aa0cc35f2fd3a9358817a7350bc6eedaa9d956/headshots/yang.png"
                                    extra={item.tag}
                                />
                                <Card.Body>
                                    <View style={{ height: 42 , display: "flex", flexDirection: "column"}}>
                                    <Text style={{ marginLeft: 16 , flex: 4}}>{item.content}</Text>
                                    </View>
                                </Card.Body>
                                </Card>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end'}}>
                                        <TouchableOpacity
                                          style={styles.updownButton}
                                          onPress={()=>{this.handleUp(item)}} >
                                        <FontAwesomeIcon icon={ faThumbsUp } size={15} color='skyblue'/>
                                        </TouchableOpacity>
                                        <Text style={{ flex: 1}}>{item.up}</Text>
                                        <TouchableOpacity
                                          style={styles.updownButton}
                                          onPress={()=>{this.handleDown(item)}} >
                                        <FontAwesomeIcon icon={ faThumbsDown } size={15} color='skyblue'/>
                                        </TouchableOpacity>
                                        <Text style={{ flex: 1}}>{item.down}</Text>
                                </View>
                            </WingBlank>
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
