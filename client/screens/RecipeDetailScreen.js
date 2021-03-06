import React, { Component } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Query, graphql } from 'react-apollo';
import { GET_RECIPE, GET_CURRENT_USER } from '../constants/GraphAPI';
import layout from '../constants/Layout';
import PlayButton from '../components/PlayButton';
import Loading from '../components/Loading';

const { height, width } = layout.window;

export class RecipeDetail extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    scrollY: new Animated.Value(0),
  }

  _handleEnterLearningMode = (recipe) => {
    try {
      // Prevent unlogged user from entering learning screen
      this.props.data.currentUser
        ? this.props.navigation.navigate('Ingredients', { recipe })
        : this.props.navigation.navigate('Welcome')
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { _id } = this.props.navigation.state.params;

    // animation of recipe image (size) when user scrolls up and down
    const albumHeight = this.state.scrollY.interpolate({
      inputRange: [height * (-1), 0],
      outputRange: [height * 1.3, height * 0.35],
    });

    return (
      <View style={styles.viewContainer}>
        <Query query={GET_RECIPE} variables={{ _id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
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

                  { // Ingredients
                    (`${ingredients};${burden}`).split(';').map((item, k) => (
                      <View key={`ingredient-${k}`} style={styles.ingredientContainer}>
                        <Text style={styles.contentText}>{ item.split(',')[0] }</Text>
                        <Text style={styles.contentText}>{ item.split(',')[1] }</Text>
                      </View>
                    ))
                  }

                  <Text style={styles.heading}>Steps</Text>
                    { // Steps
                      steps.map((step, i) => (
                        <View key={i} style={styles.stepContainer}>
                          <Text style={{ ...styles.contentText, ...styles.stepText}}>{step.step}</Text>
                          <Image source={{ uri: step.img }} style={styles.stepImg} />
                        </View>
                      ))
                    }
                  </View>
                </ScrollView>
                { // Learn mode play button
                  <PlayButton onPress={() => this._handleEnterLearningMode(data.getRecipe)} />
                }
              </View>
            )
          }}
        </Query>
      </View>
    )
  }
}

export default graphql(GET_CURRENT_USER)(RecipeDetail);

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
})