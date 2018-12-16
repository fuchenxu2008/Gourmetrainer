import gql from 'graphql-tag';

export const defaults = {
    currentUser: null,
}

export const resolvers = {
    Mutation: {
        // createUser: (_, params, { cache }) => {
        //     console.log('params: ', params);
        //     // const CREATE_USER = gql`
        //     //     mutation createUser($params: UserInput!) {
        //     //         createUser(params: $params) {
        //     //             _id
        //     //             nickname
        //     //             email
        //     //             token
        //     //             gender
        //     //         }
        //     //     }
        //     // `;

        //     // cache.writeQuery({
        //     //     query: CREATE_USER,
        //     //     data: {
        //     //         currentUser: user
        //     //     }
        //     // });
        // },
        // loginUser: (_, { email, password }, { cache }) => {
        //     console.log('params: ', params);
        //     const LOGIN_USER = gql`
        //         query loginUser($email: String!, $password: String!) {
        //             loginUser(email: $email, password: $password) @client {
        //                 _id
        //                 nickname
        //                 email
        //                 token
        //                 gender
        //             }
        //         }
        //     `;

        //     cache.writeQuery({
        //         query: CREATE_USER,
        //         variables: { email, password }
        //         data: {
        //             currentUser: user
        //         }
        //     });
        // }
    }
}