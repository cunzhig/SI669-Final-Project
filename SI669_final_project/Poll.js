import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { CheckBox} from 'react-native-elements';
import { Card, WingBlank } from '@ant-design/react-native';
import { styles } from './Styles'
import {
    LineChart,
    BarChart,
    PieChart,
} from 'react-native-chart-kit'

export class PollScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pollDataList: [
                { key: 'Biden', tag: 'Biden', data: { data: [29, 33, 36, 38, 34, 32, 33, 32, 32, 32] } },
                { key: 'Sanders', tag: 'Sanders', data: { data: [27, 25, 22, 20, 19, 19, 20, 19, 20, 20] } },
                { key: '2', tag: 'Warren', data: { data: [7, 7, 9, 9, 13, 14, 15, 21, 20, 17] } },
                { key: '3', tag: 'Buttigieg', data: { data: [0, 0, 8, 7, 6, 5, 8, 5, 7, 8] } },
                { key: 'Harris', tag: 'Harris', data: { data: [10, 8, 7, 7, 10, 13, 8, 6, 6, 5] } },
                { key: 'Yang', tag: 'Yang', data: { data: [0, 0, 2, 1, 3, 2, 2, 3, 3, 3] } },
                { key: '6', tag: 'Booker', data: { data: [4, 4, 3, 3, 2, 2, 3, 3, 2, 2] } },
                { key: '7', tag: 'Klobuchar', data: { data: [3, 2, 2, 1, 1, 1, 1, 1, 2, 2] } },
                { key: '8', tag: 'Gabbard', data: { data: [1, 0, 0, 0, 0, 0, 1, 1, 2, 2] } },
                { key: '9', tag: 'Steyer', data: { data: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1] } },
            ],
            candidates: [
                { key: 'Yang', lastname: "Yang", education: "", isSelected: false, img: require('./images/yang.jpg'), url: "https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html", poll: { data: [0, 0, 2, 1, 3, 2, 2, 3, 3, 3] } },
                { key: 'Trump', lastname: "Trump", education: "", isSelected: false, img: require('./images/trump.jpeg'), url: "https://www.cnn.com/2013/07/04/us/donald-trump-fast-facts/index.html" },
                { key: 'Biden', lastname: "Biden", education: "", isSelected: false, img: require('./images/biden.png'), url: "https://www.cnn.com/2013/01/22/us/joe-biden-fast-facts/index.html", poll: { data: [29, 33, 36, 38, 34, 32, 33, 32, 32, 32] } },
                { key: 'Harris', lastname: "Harris", education: "", isSelected: false, img: require('./images/harris.jpg'), url: "https://www.cnn.com/2019/01/28/us/kamala-harris-fast-facts/index.html", poll: { data: [10, 8, 7, 7, 10, 13, 8, 6, 6, 5] } },
                { key: 'f', lastname: "Yang", education: "um", isSelected: false, img: require('./images/yang.jpg'), url: "https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html" },
                { key: 'g', lastname: "Yang", education: "um", isSelected: false, img: require('./images/yang.jpg'), url: "https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html" },
                { key: 'h', lastname: "Yang", education: "um", isSelected: false, img: require('./images/yang.jpg'), url: "https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html" },
                { key: 'i', lastname: "Yang", education: "um", isSelected: false, img: require('./images/yang.jpg'), url: "https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html" },
                { key: 'j', lastname: "Yang", education: "um", isSelected: false, img: require('./images/yang.jpg'), url: "https://www.cnn.com/2019/08/28/us/andrew-yang-fast-facts/index.html" },
            ],
        }

    }

    handleChoose(candidate){
     let newCandidates = [];
     for (c of this.state.candidates){
       if (c.key == candidate.key){
         c.isSelected = !c.isSelected;
       }
       newCandidates.push(c);
     }

     this.setState({
       candidates:newCandidates,
     });
    }

    render() {
        const pollData = this.state.pollDataList.slice()
        console.log(pollData)
        let top5Poll = pollData.map(poll => ({ data: poll.data.data }));
        console.log(top5Poll)
        const linedata = {
            labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            datasets: top5Poll
        };

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
                                source= {item.img}
                                style={styles.ImageIconStyle}
                              />
                              <Text style={styles.iconTextStyle}> {item.lastname}</Text>
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
                  <View style={{flex: 0.7}}>
                    <FlatList
                        data={this.state.candidates}
                        renderItem={
                            ({ item }) => {
                                const pollData = {
                                    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
                                    datasets: [item.poll]
                                };
                                return (
                                    <View>
                                    {item.isSelected ?
                                    <View>
                            <Text>{item.lastname}</Text>
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
