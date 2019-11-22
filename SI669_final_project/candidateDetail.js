import React from 'react';
import { View, Text, Image, } from 'react-native';
import { styles } from './Styles';
import Timeline from 'react-native-timeline-feed';
import { Preset } from 'react-native-timeline-feed/lib/Types';

export class CandidateScreen extends React.Component{
    constructor(props){
        super(props);
        this.candidate = this.props.navigation.getParam('candidate');
        this.homeScreen = this.props.navigation.getParam('homeScreen');
        this.data = [
            {time: '2002-2005', title: 'Vice president of a healthcare start-up.',description:''},
            {time: '2006-2011', title: ' Managing director, then CEO, of Manhattan Prep, a test-prep company.', description: ''},
            {time: '2009', title: 'Kaplan buys Manhattan Prep for more than $10 million.', description: ''},
            {time: '2011', title: 'Founds Venture for America, a non-profit which connects recent college graduates with start-ups. Leaves the company in 2017.', description: ''},
            {time: '2012', title: 'Is recognized by President Barack Obama as a "Champion of Change."', description: ''}
          ];
    }

    render(){
        return(
            <View>
                {/* <Text>{this.candidate.lastname}</Text> */}
                <Image
                      source= {this.candidate.img}
                      style={styles.ImageIconStyle}
                    />
                <Text>Personal:{"\n"}
                        Birth date: January 13, 1975{"\n"}
                        Birth place: Schenectady, New York{"\n"}
                        Birth name: Andrew M. Yang{"\n"}
                        Father: Kei-Hsiung Yang, researcher at IBM and GE{"\n"}
                        Mother: Nancy L. Yang, systems administrator{"\n"}
                        Marriage: Evelyn (Lu) Yang (2011-present){"\n"}
                        Children: Two sons{"\n"}
                        Education: B.A. in Economics, Brown University, 1996; J.D. Columbia University School of Law, 1999{"\n"}
                        Religion: Protestant{"\n"}</Text>

                <Timeline
                data={this.data}
                />
            </View>
            
        );
    }
}

