import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import RecipeSearchResult from '../containers/RecipeSearchResult';
import TagCard from '../components/TagCard';
import allTags from '../constants/Tags';
export default class SearchScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        search_term: '',
    }

    _handleInputChange = (title) => {
        this.setState({ search_term: title })
    }

    render() {
        const { search_term } = this.state;

        return (
                <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 30 }}>
                    <View style={styles.headerSection} onPress={this._handleBeginSearch}>
                        <SearchBar
                            onInputChange={this._handleInputChange}
                            placeholder='What you wanna cook?'
                            keywords={this.state.search_term}
                            autoFocus={true}
                        />
                    </View>
                    {
                        search_term
                        ? <RecipeSearchResult term={search_term} limit={15} />
                        : (
                            <View style={styles.cardContainer}>
                                {
                                    allTags.map((tag, i) => (
                                        <TagCard key={i} tag={tag} index={i} onPress={() => this._handleInputChange(`#${tag}`)} />
                                    ))
                                }
                            </View>
                        )
                    }
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
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 40,
    }
})