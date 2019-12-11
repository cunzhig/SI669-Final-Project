import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import { Icon, ButtonGroup } from 'react-native-elements';
import { Slider } from 'react-native-elements'
import { styles } from './Styles'

export class RankScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            sliderValue: 15,
            rankList: [],
            noRes: false,
        };
    }

    updateSearch = search => {
        this.setState({ search: search });
    };

    handlePress = async () => {
        fetch('http://127.0.0.1:5000/rank/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "key": this.state.search,
                "num": this.state.sliderValue,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.res.length != 0) {
                    this.setState({ rankList: responseJson.res, noRes: false });
                } else {
                    this.setState({ rankList: [], noRes: true });
                    Alert.alert(
                        'No Result Found!',
                        'Please use other queries',
                        [
                            {
                                text: 'OK',
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false },
                    );
                }

            })
            .catch((error) => {
                console.error(error);
                this.setState({ noRes: true })
                Alert.alert(
                    'Something Wrong',
                    error,
                    [
                        {
                            text: 'OK',
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false },
                );
            });
    }

    render() {
        const { search } = this.state.search;
        return (
            <ScrollView style={styles.container}>
            <View>
                <Text style={styles.headText}>Rank</Text>

                <Searchbar
                    style={{}}
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    onIconPress={this.handlePress.bind(this)}
                />
                <View style={{display:"flex", flexDirection:"row"}}>
                    <View style={{flex:0.2}}>
                    <Text>Number of Results: {this.state.sliderValue}</Text>
                    </View>
                    <View style={{flex:0.7}}>
                    <Slider
                        value={this.state.sliderValue}
                        maximumValue={100}
                        step={1}
                        onValueChange={sliderValue => this.setState({ sliderValue })}
                        
                    />
                    </View>
                    <View style={{flex:0.1}}></View>
                </View>
                
                <FlatList
                    style={{ paddingTop: 20 }}
                    data={this.state.rankList}
                    renderItem={
                        ({ item, index }) => {
                            return (
                                <View style={{ alignItems: 'flex-start', display: "flex", flexDirection: "row" }}>
                                    <View style={{ flex: 0.1 }}></View>
                                    <View style={{ flex: 0.7, alignSelf: "center" }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{ fontWeight: '400' }}
                                        >{index + 1}. {item}</Text>
                                    </View>
                                    <View style={{ flex: 0.2, alignItems: "center" }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                console.log(item)
                                                Alert.alert(
                                                    'Full Text',
                                                    item,
                                                    [
                                                        {
                                                            text: 'OK',
                                                            style: 'cancel',
                                                        },
                                                    ],
                                                    { cancelable: false },
                                                );
                                            }}>
                                            <Icon
                                                reverse
                                                name='plus'
                                                type='font-awesome'
                                                color='#1e90ff'
                                                size={12}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }
                    }
                >

                </FlatList>
                
            </View>
            </ScrollView>
        );
    }
}