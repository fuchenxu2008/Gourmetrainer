import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation createUser($params: UserInput!) {
    createUser(params: $params) {
      _id
      nickname
      email
      token
      gender
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