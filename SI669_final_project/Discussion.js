import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, WingBlank, Button } from '@ant-design/react-native';

export class DiscussionScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            discussionList:[
                {key:'0',type:"Discussion", tag:"Yang",content:"My whole family supports Yang", up:0, down:0},
                {key:'1',type:"Discussion", tag:"Yang",content:"My whole family supports Yang", up:0, down:0},
                {key:'2',type:"Discussion", tag:"Yang",content:"My whole family supports Yang", up:0, down:0},
                {key:'3',type:"Discussion", tag:"Yang",content:"My whole family supports Yang", up:0, down:0},
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
        <View>
            <View style={{height: 50}}>
                <Text style={{ textAlign:"center" , fontSize: 40}}>Discussion</Text>
            </View>
            <View>
                <FlatList
                    data = {this.state.discussionList}
                    renderItem = {
                    ({item}) => {
                        return(
                            
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
                                <View style={{ display: "flex", flexDirection: "row"}}>
                                        
                                        <Button type="ghost" size="small" style={{width: 50}} onPress ={()=>{this.handleUp(item)}}>up</Button>
                                        <Text style={{ flex: 1}}>{item.up}</Text>
                                        
                                        <Button type="ghost" size="small" style={{width: 50}} onPress ={()=>{this.handleDown(item)}}>down</Button>
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