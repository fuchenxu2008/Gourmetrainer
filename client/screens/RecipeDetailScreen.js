import React, { Component } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '../components/Button'

const GET_RECIPE = gql`
  query getRecipe($_id: String!) {
    getRecipe(_id: $_id) {
      title
      intro
      albums
      tags
      ingredients
      burden
      steps {
        img
        step
      }
    }
  }
`;

const { height, width } = Dimensions.get('window');

export default class RecipeDetail extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    scrollY: new Animated.Value(0),
  }

  render() {
    const { _id } = this.props.navigation.state.params;
    const albumHeight = this.state.scrollY.interpolate({
      inputRange: [height * (-1), 0],
      outputRange: [height * 1.3, height * 0.35],
    });

    return (
      <View style={styles.viewContainer}>
        <Query query={GET_RECIPE} variables={{ _id }}>
          {({ loading, error, data }) => {
            if (loading) return <Text>No results</Text>;
            if (error) return <Text>{`Error!: ${error}`}</Text>;
            {/** Detail Page */}
            const { title, albums, intro, tags, ingredients, burden, steps } = data.getRecipe;
            return (
              <View style={{ flex: 1, }}> 
                <View style={styles.recipeImgContainer}>
                  <Animated.Image source={{ uri: albums[0] }} style={{
                    height: albumHeight,
                    width: '100%',
                  }} />
                </View>

                <ScrollView
                  scrollEnabled
                  scrollEventThrottle={16}
                  onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                  )}
                >
                  <View style={{ height: 0.28 * height }} />
                  <View style={styles.recipeCard}>
                  <Text style={styles.title}>{title}</Text>
                  <Text>{tags}</Text>

                  <Text style={styles.heading}>Introduction</Text>
                  <Text>{intro}</Text>
                  <Text style={styles.heading}>Ingredients</Text>
                  <Text>{ingredients}{burden}</Text>

                  <Text style={styles.heading}>Steps</Text>
                    {
                      steps.map((step, i) => (
                        <View key={i} style={styles.stepContainer}>
                          <Text style={styles.stepText}>{step.step}</Text>
                          <Image source={{ uri: step.img }} style={styles.stepImg} />
                        </View>
                      ))
                    }
                  </View>
                </ScrollView>
              </View>
            )
          }}
        </Query>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'rgb(250, 250, 250)',
  },
  recipeCard: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingLeft: '6%',
    paddingRight: '6%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  recipeImgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  recipeImg: {
    flex: 1,
    width: null,
    height: null,
  },
  stepText: {
    marginBottom: 10,
  },
  stepContainer: {
    marginBottom: 30,
  },
  stepImg: {
    alignSelf: 'center',
    width: '100%',
    height: width * 0.88 * 0.6,
    borderRadius: 10,
  }
})