import React, { Component } from 'react'
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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

export default class RecipeDetail extends Component {
  static navigationOptions = {
    title: 'Recipe Detail',
  };

  render() {
    const { _id } = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.viewContainer}>
        <Query query={GET_RECIPE} variables={{ _id }}>
          {({ loading, error, data }) => {
            if (loading) return <Text>No results</Text>;
            if (error) return <Text>{`Error!: ${error}`}</Text>;
            const { title, albums, intro, tags, ingredients, burden, steps } = data.getRecipe;
            return (
              <View style={{ paddingBottom: 30 }}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.recipeAlbum}>
                  {albums.map((uri, i) => (
                    <Image key={i} source={{ uri }} style={styles.recipeAlbumImg} />
                  ))}
                </View>
                <Text style={styles.heading}>Tags</Text>
                <Text>{tags}</Text>
                <Text style={styles.heading}>Intro</Text>
                <Text>{intro}</Text>
                <Text style={styles.heading}>Ingredients</Text>
                <Text>{ingredients}</Text>
                <Text style={styles.heading}>Burden</Text>
                <Text>{burden}</Text>
              </View>
            )
          }}
        </Query>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    paddingTop: 20,
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingBottom: 30,
    backgroundColor: 'rgb(250, 250, 250)',
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
  recipeAlbum: {
    // marginBottom: 10,
  },
  recipeAlbumImg: {
    width: 200,
    height: 200,
    borderRadius: 10,
  }
})