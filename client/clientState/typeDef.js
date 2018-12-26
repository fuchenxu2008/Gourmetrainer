export default /* GraphQL */`
    type Query {
        currentUser: User
    }

    type Mutation {
        createUser(params: UserInput!): User
        loginUser(email: String!, password: String!): User
    }

    type User {
        _id: String!
        nickname: String!
        email: String!
        password: String!
        gender: String!
        token: String
        avatar: String
        cookedHistories: [CookedHistory]!
    }

    type CookedHistory {
        _id: String!
        user: User!
        recipe: Recipe!
        rating: Float
    }

    type Recipe {
        _id: String!
        title: String!
        tags: String!
        intro: String
        ingredients: String!
        burden: String
        albums: [String]
        steps: [Step!]!
    }

    type Step {
        img: String
        step: String!
    }
`