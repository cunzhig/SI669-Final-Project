import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { CheckBox} from 'react-native-elements';
import { Card, WingBlank } from '@ant-design/react-native';
import { styles } from './Styles'
import { LineChart } from 'react-native-chart-kit'
import firebase from 'firebase';
import '@firebase/firestore';

export class PollScreen extends React.Component {
    constructor(props) {
        super(props);

        const db = firebase.firestore();
        this.candidateRef = db.collection('candidates');
        this.candidateRef.get().then(queryRef => {
            let newEntries = [];
            queryRef.forEach(docRef => {
                let docData = docRef.data();
                let newEntry = {
                    tag: docData.tag,
                    url: docData.url,
                    key: docRef.id,
                    poll: docData.poll.split(", "),
                    isSelected:docData.isSelected
                }
                newEntries.push(newEntry);
            })
            this.setState({ candidates: newEntries });
        });

        this.state ={
          candidates: []
        };

    }

    handleChoose(candidate){
     let newCandidates = [];
     for (c of this.state.candidates){
       if (c.tag == candidate.tag){
         c.isSelected = !c.isSelected;
       }
       newCandidates.push(c);
     }

     this.setState({
       candidates:newCandidates,
     });
    }

    render() {
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
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <Text style={styles.headText}>Poll</Text>
                </View>
                <View style={styles.bodyContainer}>
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
                          onPress = {()=>{this.handleChoose(item)}}
                          />
                          </View>
                          );
                        }
                      }
                    >
                    </FlatList>
                  </View>
                  <View style={{flex: 1.2}}>
                    <FlatList
                        data={this.state.candidates}
                        renderItem={
                            ({ item }) => {
                                const pollData = {
                                    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
                                    datasets: [{"data":item.poll}]
                                };
                                return (
                                    <View>
                                    {item.isSelected ?
                                    <View>
                            <Text>{item.tag}</Text>
                                    <LineChart
                                        data={pollData}
                                        width={Dimensions.get('window').width} // from react-native
                                        height={200}
                                        yAxisSuffix={'%'}
                                        chartConfig={{
                                            backgroundColor: '#e26a00',
                                            backgroundGradientFrom: '#fb8c00',
                                            backgroundGradientTo: '#ffa726',
                                            decimalPlaces: 0, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            style: {
                                                borderRadius: 4
                                            }
                                        }}
                                        bezier
                                        style={{
                                            marginVertical: 0,
                                            marginHorizontal: 0,
                                            borderRadius: 4
                                        }}
                                    />
                                    </View>
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
        );
    }
}
