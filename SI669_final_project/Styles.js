import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    timerContainer:{
        flex:0.2,
        justifyContent: 'flex-end'
    },
    candidatesContainer: {
        flex: 0.2,
        padding: 10,
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor:'grey',
        alignContent:'center'
    },
    candidateStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#fff',
        backgroundColor:'pink',
        height: 80,
        width: 80,
        borderRadius: 5,
        margin: 5,
        padding:5
    },
    ImageIconStyle: {
        padding:10,
        height: 50,
        width: 50,
        resizeMode: 'stretch',
    },
    TextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginRight: 20,
    },
    SeparatorLine: {
        backgroundColor: '#fff',
        width: 70,
        height: 1,
    },
    topnewsContainer: {
        flex: 0.3,
        justifyContent: 'flex-end',
        backgroundColor:'pink',
        width:'100%'
    },
    topdisContainer: {
        flex: 0.3,
        justifyContent: 'flex-end',
        backgroundColor: 'lightblue',
        width:'100%'
    },
});