import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, WingBlank } from '@ant-design/react-native';
import {styles} from './Styles';
import { Linking } from 'expo';
import firebase from 'firebase';
import '@firebase/firestore';

export class NewsScreen extends React.Component {
    constructor(props){
        super(props);



        const db = firebase.firestore();
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



        this.state = {
            // newsList: [
            //     {key:'0',type:"News", tag:"Biden",title:"Why the Less Disruptive Health Care Option Could Be Plenty Disruptive", reporter:"Margot Sanger-Katz", img:require('./images/news_biden_2.jpg'),url:"https://www.nytimes.com/2019/12/03/upshot/public-option-medicare-for-all.html"},
            //     {key:'1',type:"News", tag:"Trump",title:"200,000 People Without Insurance May Apply for Free H.I.V.-Prevention Drugs", reporter:"Donald G. McNeil Jr.", img:require('./images/news_trump_1.jpg'),url:"https://www.nytimes.com/2019/12/03/health/truvada-prep-hiv-gilead.html"},
            //     {key:'2',type:"News", tag:"Yang",title:"Andrew Yang: Yes, Robots Are Stealing Your Job", reporter:"Andrew Yang", img:require('./images/news_yang_1.jpg'),url:"https://www.nytimes.com/2019/11/14/opinion/andrew-yang-jobs.html"},
            //     {key:'3',type:"News", tag:"Harris",title:"Kamala Harris Drops Out of 2020 Presidential Race", reporter:"ASTEAD W. HERNDON", img:require('./images/news_harris_1.jpg'),url:"https://www.nytimes.com/2019/12/03/us/politics/kamala-harris-campaign-drops-out.html"},

            //   ]
        }
     }

     handleView(candidateToView){
      Linking.openURL(candidateToView.url);
      this.props.onPress && this.props.onPress();
     }

     render(){
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

     return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <Text style={styles.headText}>News</Text>
            </View>
            <View style={styles.bodyContainer}>
                <FlatList
                  data = {this.state.newsList}
                  renderItem = {
                  ({item, index}) => {
                    return(
                      <TouchableOpacity
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
