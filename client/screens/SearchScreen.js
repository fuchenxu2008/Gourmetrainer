import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import RecipeSearchResult from '../containers/RecipeSearchResult';

export default class SearchScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        search_title: ''
    }

    _handleInputChange = (title) => {
        this.setState({ search_title: title })
    }

    render() {
        const { search_title } = this.state;

        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.headerSection} onPress={this._handleBeginSearch}>
                    <SearchBar
                        onInputChange={this._handleInputChange}
                        placeholder='What you wanna cook?'
                        keywords={this.state.search_title}
                        autoFocus={true}
                    />
                </View>
                <RecipeSearchResult title={search_title} limit={15} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingTop: 40,
        backgroundColor: 'rgb(250, 250, 250)',
    },
    headerSection: {
        marginHorizontal: '6%',
    },
})