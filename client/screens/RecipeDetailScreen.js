import React, { Component } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, Animated, TouchableHighlight } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo';
import layout from '../constants/Layout';

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

const { height, width } = layout.window;

export default class RecipeDetail extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    scrollY: new Animated.Value(0),
  }

  _handleEnterLearningMode = (recipe) => {
    this.props.navigation.navigate('Ingredients', { recipe })
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
                  <View style={styles.tagsContainer}>
                    <Text style={styles.tags}>{tags}</Text>
                  </View>
                  <Text style={styles.heading}>Introduction</Text>
                  <Text style={styles.contentText}>{intro}</Text>
                  <Text style={styles.heading}>Ingredients</Text>

                  {
                    (`${ingredients};${burden}`).split(';').map((item, k) => (
                      <View key={`ingredient-${k}`} style={styles.ingredientContainer}>
                        <Text style={styles.contentText}>{ item.split(',')[0] }</Text>
                        <Text style={styles.contentText}>{ item.split(',')[1] }</Text>
                      </View>
                    ))
                  }

                  <Text style={styles.heading}>Steps</Text>
                    {
                      steps.map((step, i) => (
                        <View key={i} style={styles.stepContainer}>
                          <Text style={{ ...styles.contentText, ...styles.stepText}}>{step.step}</Text>
                          <Image source={{ uri: step.img }} style={styles.stepImg} />
                        </View>
                      ))
                    }
                  </View>
                </ScrollView>
                <TouchableHighlight onPress={() => this._handleEnterLearningMode(data.getRecipe)}>
                  <LinearGradient
                    colors={['#89f7fe', '#66a6ff']}
                    start={[0, 0]}
                    end={[1, 1]}
                    location={[0.25, 0.4]}
                    style={styles.playIconContainer}
                  >
                    <AntDesign
                        name='caretright'
                        size={40}
                        style={styles.playIcon}
                    />
                  </LinearGradient>
                </TouchableHighlight>
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
  tagsContainer: {
    backgroundColor: 'rgb(243, 223, 69)',
    alignSelf: 'flex-start',
    borderRadius: 13,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tags: {
    color: 'white',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 23,
    marginTop: 25,
    marginBottom: 10,
    color: 'rgb(243, 223, 69)',
  },
  contentText: {
    color: 'rgb(100, 100, 100)',
    fontSize: 15,
    lineHeight: 22,
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: '6%',
    paddingRight: '6%',
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
  },
  playIconContainer: {
    position: 'absolute',
    bottom: 0.05 * width,
    right: 0.05 * width,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: width,
    // backgroundColor: 'rgb(245, 222, 25)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: '#66a6ff',
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  playIcon: {
    color: 'white',
  }
})