import gql from 'graphql-tag';

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

export const GET_RECIPES_BY_LEVEL = gql`
    query GetRecipesByLevel($tags: String!, $level: Int!) {
      getRecipes(tags: $tags, level: $level) {
        _id
        title
        albums
      }
    }
`;

export const ADD_COOK_HISTORY = gql`
  mutation AddCookedHistory($user: String!, $recipe: String!) {
    addCookedHistory(user: $user, recipe: $recipe) {
      _id
    }
  }
`;

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

export const GET_USER_LEVEL = gql`
  query GetUserLevel($user: String!) {
    getUserLevel(userid: $user) {
      levelSet
    }
  }
`

export const UPDATE_USER_LEVEL = gql`
  mutation updateUserLevel($user: String!, $category: String!) {
    updateUserLevel(userid: $user, category: $category) {
      levelSet
    }
  }
`