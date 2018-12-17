import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


export default class TagCenter extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const { tag } = this.props.navigation.state.params;

        return (
            <View style={styles.outestContainer}>
                <Text>{tag}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outestContainer: {
        backgroundColor: 'rgb(251, 251, 251)',
        flex: 1,
    }
});