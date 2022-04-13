import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increaseCounter, decreaseCounter } from '../redux/actions/counterAction';

class HomeScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                    <Button
                        title="Increase"
                        onPress={() => this.props.increaseCounter(5)}
                    />
                    <Text>{this.props.counter.counter}</Text>
                    <Button
                        title="Decrease"
                        onPress={() => this.props.decreaseCounter()}
                    />
                </View>
            </View>

        );
    }

}
// function mapStateToProps(state) {
//     return { counter: state.counter }
// }

const mapStateToProps = (state) => {
    const { counter } = state
    return { counter }
};
// function mapDispatchToProps(dispatch) {
//     return {
//         increaseCounter: () => dispatch({ type: 'INCREASE_COUNTER' }),
//         decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' })
//     }
// }
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        increaseCounter, decreaseCounter,
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);