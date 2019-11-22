import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, WingBlank } from '@ant-design/react-native';

export class NewsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newsList: [
                {key:'0',type:"News", tag:"Biden",title:"Why Joe Biden Resonates With Blue-Collar Voters", reporter:"Hilary Swift for The New York Times", img:require('./images/news_biden_1.jpg')},
                {key:'1',type:"News", tag:"Biden",title:"Why Joe Biden Resonates With Blue-Collar Voters", reporter:"Hilary Swift for The New York Times", img:require('./images/news_biden_1.jpg')},
                {key:'2',type:"News", tag:"Biden",title:"Why Joe Biden Resonates With Blue-Collar Voters", reporter:"Hilary Swift for The New York Times", img:require('./images/news_biden_1.jpg')},
                {key:'3',type:"News", tag:"Biden",title:"Why Joe Biden Resonates With Blue-Collar Voters", reporter:"Hilary Swift for The New York Times", img:require('./images/news_biden_1.jpg')},
                {key:'4',type:"News", tag:"Biden",title:"Why Joe Biden Resonates With Blue-Collar Voters", reporter:"Hilary Swift for The New York Times", img:require('./images/news_biden_1.jpg')},
      
              ]
        }
     }

     render(){
     return (
        <View>
            <View style={{height: 50}}>
                <Text style={{ textAlign:"center" , fontSize: 40}}>News</Text>
            </View>
            <View>
                <FlatList
                    data = {this.state.newsList}
                    renderItem = {
                    ({item}) => {
                        return(
                        <TouchableOpacity 
                        activeOpacity={0.5}
                        onPress ={()=>{this.handleView(item)}}
                        >
                            <WingBlank size="lg">
                                <Card full>
                                <Card.Header
                                    title={item.tag}
                                    thumbStyle={{ width: 30, height: 30 }}
                                    thumb= "https://static01.nyt.com/newsgraphics/2019/10/24/2020-landing-page/96aa0cc35f2fd3a9358817a7350bc6eedaa9d956/headshots/biden.png"
                                    extra={item.type}
                                />
                                <Card.Body>
                                    <View style={{ height: 42 , display: "flex", flexDirection: "row"}}>
                                    <Image
                                    source= {item.img}
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
     );
     }


}