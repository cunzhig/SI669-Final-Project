import React from 'react';
import { View, Text} from 'react-native';
import { Button, Input, ButtonGroup } from 'react-native-elements';
import { styles } from './Styles';
import { AsyncStorage } from 'react-native';

export class DiscussionDetailScreen extends React.Component {

  constructor(props) {
    super(props);

    this.entryToUpdate = this.props.navigation.getParam('entry', undefined);
    this.discussionScreen = this.props.navigation.getParam('discussionScreen');

    this.isAdd = (typeof this.entryToUpdate === 'undefined');
    
    let initContent = '';
    let initTag = 'Bennet';
    let initUp = 0;
    let initDown = 0;

    AsyncStorage.getItem('userKey', (err, result) => {
        console.log(result);
        this.setState({ authorKey: result })
    });
    AsyncStorage.getItem('userName', (err, result) => {
        console.log(result);
        this.setState({ authorName: result })
    });

    let tagButtons = ['Bennet', 'Biden', 'Bloomberg', 'Booker', 'Buttigieg', 'Castro', 'Delaney', 'Gabbard', 'Klobuchar', 'Patrick', 'Sanders', 'Steyer', 'Warren', 'Williamson', 'Yang', 'Trump', 'Walsh', 'Weld']

    if (!this.isAdd) {
        initContent = this.entryToUpdate.content;
        initTag = this.entryToUpdate.tag;
        initUp = this.entryToUpdate.up;
        initDown = this.entryToUpdate.down;
    }

    // categoryButtons.indexOf(this.entryToUpdate.category);

    this.state = {
      content: initContent,
      up: initUp,
      down: initDown,
      tag: initTag,
      tagIndex: tagButtons.indexOf(initTag),
    }

    this.updateTagIndex = this.updateTagIndex.bind(this)

    console.log(this.state)
  }

  

  handleSave = () => {
    console.log(this.state)
    let tagButtons = ['Bennet', 'Biden', 'Bloomberg', 'Booker', 'Buttigieg', 'Castro', 'Delaney', 'Gabbard', 'Klobuchar', 'Patrick', 'Sanders', 'Steyer', 'Warren', 'Williamson', 'Yang', 'Trump', 'Walsh', 'Weld']
    let newEntry = {
        tag: this.state.tag,
        content: this.state.content,
        up: this.state.up,
        down: this.state.down,
        authorKey: this.state.authorKey,
        authorName: this.state.authorName
    }
    let discussionScreen = this.props.navigation.getParam('discussionScreen');
    if (this.isAdd) {
        discussionScreen.addEntry(newEntry);
    } else {
      newEntry.key = this.entryToUpdate.key;
      discussionScreen.updateEntry(newEntry);
    }
    this.props.navigation.goBack();
  }

  updateTagIndex (selectedIndex) {
    this.setState({"tagIndex": selectedIndex})
  }

  render() {

    const tagButtons = ['Bennet', 'Biden', 'Bloomberg', 'Booker', 'Buttigieg', 'Castro', 'Delaney', 'Gabbard', 'Klobuchar', 'Patrick', 'Sanders', 'Steyer', 'Warren', 'Williamson', 'Yang', 'Trump', 'Walsh', 'Weld']
    return (
      <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Discussion Detail</Text>
          </View>
        <View style={styles.detailsBodyContainer}>
          <View style={styles.detailsInputContainer}>
          <Text>What you want to say</Text>
            <Input
              multiline={true}
              placeholder="Content"
              inputContainerStyle={styles.largeInput}
              containerStyle={{justifyContent: 'flex-start'}}
              value={this.state.content}
              onChangeText={(value)=>{this.setState({content: value})}}
            />
          </View>
          <View style={styles.detailsLabelsContainer}>
          <Text>Tag</Text>
          <ButtonGroup
            onPress={this.updateTagIndex}
            selectedIndex={this.state.tagIndex}
            buttons={tagButtons}
            containerStyle={{height: 30}}
          /> 
          </View>
    
        </View>
        <View style={styles.footerContainer}>
          <Button
            title='Cancel'
            containerStyle={styles.mediumButtonContainer}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Button
            title='Save'
            containerStyle={styles.mediumButtonContainer}
            onPress={this.handleSave}
          />
        </View>
      </View>
    );
  }

}