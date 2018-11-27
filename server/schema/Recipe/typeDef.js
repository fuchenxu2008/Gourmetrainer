module.exports = `
    type Step {
        img: String
        step: String
    }

    type Recipe {
        _id: String
        title: String
        tags: String
        intro: String
        ingredients: String
        burden: String
        albums: [String]
        steps: [Step]
    }
`;