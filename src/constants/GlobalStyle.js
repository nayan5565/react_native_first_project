import { StyleSheet } from "react-native";

export default StyleSheet.create({
    bottomCard: {
        backgroundColor: 'green',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 8,
    },
    whiteText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'GreatVibes-Regular'
    },
    inputStyle: {
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        paddingHorizontal: 8,
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    },
    textInput: {
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        // paddingLeft: 10,

    },
    action: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        color: '#05375a',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222831'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#222831',
        justifyContent: 'center',
        alignItems: 'center',
    }

})