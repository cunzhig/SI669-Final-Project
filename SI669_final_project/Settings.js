import React from 'react';
import {styles} from './Styles'
import {Timer} from './Timer'
import { View, Button, CameraRoll } from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';
import {AsyncStorage} from 'react-native';

export class SettingScreen extends React.Component {
    constructor(props)  {
        super(props);
        if (firebase.apps.length == 0) {
          firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.firestore();
        this.usersRef = db.collection('users');
        this.state = {
          errorMessage: '',
          usernameText: '',
          passwordText: '',
          photos: '',
        }
      }

      _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
          })
          .then(r => {
            this.setState({ photos: r.edges });
          })
          .catch((err) => {
             //Error Loading Images
          });
        };
    
        render() {
            return (
              <View>
                <Button title="Load Images" onPress={this._handleButtonPress} />
                {/* <ScrollView>
                  {this.state.photos.map((p, i) => {
                  return (
                    <Image
                      key={i}
                      style={{
                        width: 300,
                        height: 100,
                      }}
                      source={{ uri: p.node.image.uri }}
                    />
                  );
                })}
                </ScrollView> */}
              </View>
            );
           }
}