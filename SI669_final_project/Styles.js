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
        flex: 0.4,
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
    labelSelectCheckBoxContainer: {
      padding: 1,
      margin: 1
    },
    updownButton: {
      borderWidth: 1,
      borderRadius: 3,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'skyblue',
      marginRight: 10,
      padding: 2,
    },
    footerContainer: {
      flex: 0.3,
      flexDirection: 'row',
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailsBodyContainer: {
      flex: 0.6,
      padding: 20,
      width: '100%',
      justifyContent: 'flex-start',
    },
    detailsInputContainer: {
      flex: 0.5
    },
    detailsLabelsContainer: {
      flex: 0.5
    },
    headerFunctionContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingHorizontal: 20,
    },
    headerFunctions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    bodyContainer: {
      flex: 0.8,
      width: '100%',
      justifyContent: 'flex-start',
    },
    bodyListItem: {
      flex: 1,
      margin: 10,
      flexDirection: 'row',
      width: '100%'
    },
    bodyListItemLeft: {
      flex: 0.2,
      margin: 10,
      flexDirection: 'row',
      justifyContent: "flex-start",
      alignItems: "center"
    },
    bodyListItemRight: {
      flex: 0.8,
      margin: 10,
      flexDirection: 'row',
      justifyContent: "flex-end",
      alignItems: "center"
    },
    bodyListItemDate: {
      fontSize: 12
    },
    bodyListItemText: {
      fontSize: 18
    },
    detailsBodyContainer: {
      flex: 0.6,
      padding: 20,
      width: '100%',
      justifyContent: 'flex-start',
    },
    detailsInputContainer: {
      flex: 0.5
    },
    detailsLabelsContainer: {
      flex: 0.5
    },
    labelSelectContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    labelSelectCheckBoxContainer: {
      padding: 1,
      margin: 1
    },
    labelSelectText: {
      fontSize: 16
    },
    mediumButtonContainer: {
      flex: 0.5,
      margin: 3,
    },
    smallButtonContainer: {
      flex: 0.3,
      margin: 3,
      backgroundColor: "white",
    },
    mediumButtonTitle: {
      fontSize: 14
    },
    smallButtonTitle: {
      fontSize: 12
    },
    largeInput: {
      borderWidth: 1,
      borderColor: 'black',
      height: '95%'
    },
});
