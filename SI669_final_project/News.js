import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, WingBlank } from '@ant-design/react-native';
import {styles} from './Styles'
import { Linking } from 'expo';

export class NewsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newsList: [
                {key:'0',type:"News", tag:"Biden",title:"Why the Less Disruptive Health Care Option Could Be Plenty Disruptive", reporter:"Margot Sanger-Katz", img:require('./images/news_biden_2.jpg'),url:"https://www.nytimes.com/2019/12/03/upshot/public-option-medicare-for-all.html"},
                {key:'1',type:"News", tag:"Trump",title:"200,000 People Without Insurance May Apply for Free H.I.V.-Prevention Drugs", reporter:"Donald G. McNeil Jr.", img:require('./images/news_trump_1.jpg'),url:"https://www.nytimes.com/2019/12/03/health/truvada-prep-hiv-gilead.html"},
                {key:'2',type:"News", tag:"Yang",title:"Andrew Yang: Yes, Robots Are Stealing Your Job", reporter:"Andrew Yang", img:require('./images/news_yang_1.jpg'),url:"https://www.nytimes.com/2019/11/14/opinion/andrew-yang-jobs.html"},
                {key:'3',type:"News", tag:"Harris",title:"Kamala Harris Drops Out of 2020 Presidential Race", reporter:"ASTEAD W. HERNDON", img:require('./images/news_harris_1.jpg'),url:"https://www.nytimes.com/2019/12/03/us/politics/kamala-harris-campaign-drops-out.html"},
                {key:'4',type:"News", tag:"Harris",title:"Why Joe Biden Resonates With Blue-Collar Voters", reporter:"Hilary Swift for The New York Times", img:require('./images/news_biden_1.jpg')},

              ]
        }
     }

     handleView(candidateToView){
      Linking.openURL(candidateToView.url);
      this.props.onPress && this.props.onPress();
     }

     render(){
     return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <Text style={styles.headText}>News</Text>
            </View>
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
     );
     }


}
