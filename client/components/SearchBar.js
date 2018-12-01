import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'expo';

const SearchBar = ({ onInputChange, placeholder, keywords }) => (
    <View style={styles.searchSection}>
        <Icon.Ionicons name='ios-search' size={24} style={styles.searchIcon} />
        <TextInput
            onChangeText={onInputChange}
            placeholder={placeholder}
            value={keywords}
            style={styles.searchInput}
        />
    </View>
)

export default SearchBar;

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // width: '90%',
        // alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        shadowOffset:{  width: 2,  height: 7,  },
        shadowColor: 'rgb(200, 200, 200)',
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    searchIcon: {
        paddingLeft: 20,
        color: 'rgb(200, 200, 200)',
        marginBottom: -3,
    },
    searchInput: {
        padding: 15,
        flex: 1,
        fontSize: 18,
        color: 'rgb(100, 100, 100)'
    }
});