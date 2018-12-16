module.exports = `
    input UserInput {
        nickname: String
        email: String!
        password: String!
        gender: String
        avatar: String
    }

    type UserLevel {
        _id: String!
        nickname: String!
        email: String!
        password: String!
        gender: String!
        token: String
        avatar: String
        cookedHistories: [CookedHistory]!
    }
`;