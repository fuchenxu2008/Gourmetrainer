import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Button from '../components/Button';
import { DropDownHolder } from '../util/alert';
import layout from '../constants/Layout';
const { height } = layout.window;

export default class IngredientsScreen extends Component {
    /** Do not display the header */
    static navigationOptions = {
        header: null,
    };

    state = {
        checklistStatus: {},
    }

    ingredients = []

    /** React lifecycle method: just before a component renders */
    componentWillMount() {
        const { recipe } = this.props.navigation.state.params; // Get recipe object passed from route
        const { burden, ingredients } = recipe;
        this.ingredients = (`${burden};${ingredients}`).split(';'); // Convert the ingredient string to array
    }

    _handleCheckAll = () => {
        const checklistStatus = {};
        this.ingredients.forEach((ing, i) => {
            checklistStatus[i] = true
        })
        // Each time `setState` is called, the component rerenders.
        this.setState({ checklistStatus })
    }

    _handleBeginCooking = (recipe) => {
        const { checklistStatus } = this.state;
        // Sum all checked items
        const checkedLength = Object.keys(checklistStatus).map(k => checklistStatus[k]).filter(checkStatus => checkStatus).reduce((x, y) => x + y, 0)
        const totalLength = this.ingredients.length;
        // Navigate to learn screen only if all ingredients are all checked
        checkedLength === totalLength
        ?   this.props.navigation.navigate('LearnStep', { recipe })
        :   DropDownHolder.alert('info', 'Hey', 'Are you done gathering these stuff?');
    }
    
    render() {
        const { checklistStatus } = this.state;
        const { recipe } = this.props.navigation.state.params;
        const { title } = recipe;

        const ingredientToDoList = this.ingredients.map((item, k) => (
            <View key={`ingredient-${k}`} style={styles.ingredientContainer}>
                <Text style={{ ...styles.contentText, fontWeight: 'bold' }}>{ item.split(',')[0] }</Text>
                    <Text style={styles.contentText}>{ item.split(',')[1] }</Text>
                <CheckBox
                    checked={checklistStatus[k] || false}
                    onPress={() => this.setState({
                        // Flip the status of current checkbox
                        checklistStatus: {
                            ...checklistStatus,
                            [k]: checklistStatus[k] ? false : true 
                        }
                    })}
                    containerStyle={{ padding: 0, margin: 0 }}
                />
            </View>
        ))

        return (
            <View style={styles.outestContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Shopping List</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <ScrollView style={styles.scrollerContainer} contentContainerStyle={{ paddingBottom: 0.15 * height }}>
                    {ingredientToDoList}
                    <TouchableOpacity onPress={this._handleCheckAll} style={styles.checkAllButton}>
                        <Text style={styles.checkAllButtonText}>Got all ingredients?</Text>
                    </TouchableOpacity>
                </ScrollView>
                <Button
                    theme='hollow'
                    onPress={() => this._handleBeginCooking(recipe)}
                    style={styles.beginButton}
                >
                    <Text>
                        Begin Cooking
                    </Text>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outestContainer: {
        backgroundColor: 'rgb(251, 251, 251)',
        flex: 1,
        paddingTop: 70,
        // paddingHorizontal: '10%',
    },
    scrollerContainer: {
        flex: 1,
        paddingHorizontal: '10%',
    },
    headingContainer: {
        marginHorizontal: '10%',        
        marginBottom: 10,
    },
    heading: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title: {
        fontSize: 30,
        marginBottom: 10,
        color: 'rgb(180, 180, 180)',
    },
    ingredientContainer: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'stretch',
    },
    contentText: {
        color: 'rgb(100, 100, 100)',
        fontSize: 15,
        lineHeight: 22,
        flex: 1,
        alignSelf: 'stretch',
    },
    checkAllButton: {
        marginTop: 30,
        borderRadius: 15,
        // borderWidth: 1,
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'rgb(150, 150, 150)'
    },
    checkAllButtonText: {
        color: 'white',
        // textDecorationLine: 'underline',
        alignSelf: 'center',
        fontSize: 16,
    },
    beginButton: {
        marginHorizontal: '10%',
        bottom: 30,
        marginTop: 10,
        borderRadius: 15,
        shadowOffset:{  width: 2,  height: 10,  },
        shadowColor: 'rgb(200, 200, 200)',
        shadowOpacity: 0.2,
        shadowRadius: 30,
    }
});