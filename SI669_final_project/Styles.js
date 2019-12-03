import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1.0
    },
    headContainer: {
      flex:0.1,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    headText: {
      textAlign:"center" ,
      fontSize: 32
    },
    timerContainer:{
        flex:0.3,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    SectionLine: {
        backgroundColor: 'grey',
        width: '90%',
        height: 1,
        justifyContent: 'center'
    },
    candidatesContainer: {
        flex: 0.3,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },
    candidateStyle: {
        alignItems:'center',
        height: 80,
        width: 80,
        margin: 5,
        padding:5
    },
    ImageIconStyle: {
        padding:5,
        height: 60,
        width: 60,
        borderWidth: 0.5,
        borderRadius: 5,
        resizeMode: 'stretch',
    },
    iconTextStyle: {
        color: '#000',
        textAlign:"center",
        fontSize: 12
    },
    sectionContainer: {
        width: '90%',
        flex: 0.2,
        margin: 5,
        width:'100%'
    },
    sectionTitle: {
      marginLeft: 20,
      textAlign: "left",
      fontSize: 20
    },
    sectionContent: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    bodyContainer: {
      flex: 0.8
    },
    labelSelectCheckBoxContainer: {
      padding: 1,
      margin: 1
    },
});
