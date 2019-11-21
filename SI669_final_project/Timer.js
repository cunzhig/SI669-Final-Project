import React from 'react';
import { View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

 
export class Timer extends React.Component {
  constructor(props) {
    super(props);
    //initialize the counter duration
    this.state = {
      totalDuration: 0,
    };
  }
  componentDidMount() {
    var that = this;
    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss');
    var expirydate = '2020-11-03 00:00:00';
    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    that.setState({ totalDuration: d });
  }
  render() {
    console.log(this.state.totalDuration);
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <CountDown
          until={this.state.totalDuration}
          timetoShow={('H', 'M', 'S')}
          onFinish={() => alert('finished')}
          onPress={() => alert('hello')}
          size={20}
        />
      </View>
    );
  }
}