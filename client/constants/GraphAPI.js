import gql from 'graphql-tag';

/**
 * All used GraphQL API usage
 * 
 * Specify what is needed and exactly those will be returned
 */

// Register
export const CREATE_USER = gql`
  mutation createUser($params: UserInput!) {
    createUser(params: $params) {
      _id
      nickname
      email
      token
      gender
      userLevel {
        levelSet
      }
    }
  }
`;

// Get current user (local global state query)
export const GET_CURRENT_USER = gql`
  {
    currentUser @client {
      _id
      nickname
      email
      token
      gender
      userLevel {
        levelSet
      }
    }
  }
`;

// Login
export const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      nickname
      email
      token
      gender
      userLevel {
        levelSet
      }
    }
  }
`;

// Get one single recipe
export const GET_RECIPE = gql`
  query getRecipe($_id: String!) {
    getRecipe(_id: $_id) {
      _id
      title
      intro
      albums
      tags
      ingredients
      burden
      level
      steps {
        img
        step
      }
    }
  }
`;

// Get featured recipes
export const GET_FEATURED = gql`
    query FeaturedRecipes($limit: Int) {
        getRandomRecipes(limit: $limit) {
            _id
            title
            albums
            tags
        }
    }
`;

// Search recipes by different terms
export const SEARCH_RECIPES = gql`
    query SearchRecipes($title: String, $tags: String, $limit: Int) {
        getRecipes(title: $title, tags: $tags, limit: $limit) {
            _id
            title
            albums
            tags
        }
    }
`;

// Get recipes by tags and level (same API as previous)
export const GET_RECIPES_BY_LEVEL = gql`
    query GetRecipesByLevel($tags: String!, $level: Int!) {
      getRecipes(tags: $tags, level: $level) {
        _id
        title
        albums
      }
    }
`;

// Add one cook history
export const ADD_COOK_HISTORY = gql`
  mutation AddCookedHistory($user: String!, $recipe: String!) {
    addCookedHistory(user: $user, recipe: $recipe) {
      _id
    }
  }
`;

// Get all cook histories of a given user
export const GET_COOK_HISTORIES = gql`
  query GetUserCookedHistory($user: String!) {
    getCookedHistories(user: $user) {
      _id
      recipe {
        title
        _id
        albums
        tags
      }
    }
  }
`;

// // Get User levels of different cuisines
// export const GET_USER_LEVEL = gql`
//   query GetUserLevel($user: String!) {
//     getUserLevel(userid: $user) {
//       levelSet
//     }
//   }
// `
// Update & unlock advanced levels
export const UPDATE_USER_LEVEL = gql`
  mutation updateUserLevel($user: String!, $category: String!) {
    updateUserLevel(userid: $user, category: $category) {
      levelSet
    }
  }
`