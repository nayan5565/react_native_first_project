import { StyleSheet } from 'react-native';
module.exports = {
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'orange',
    },
    input: {
        height: 43,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollView: {
        backgroundColor: 'pink',
        padding: 20,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    SubmitButtonStyle: {
        height: 43,
        margin: 10,
        justifyContent: 'center',
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },

    DisableButtonStyle: {
        height: 43,
        margin: 10,
        justifyContent: 'center',
        backgroundColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    },
    modalView: {
        margin: 20,
        width: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        marginVertical: 12,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        borderRadius: 12,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },

    buttonCancel: {
        backgroundColor: "red",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
}