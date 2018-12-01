const fs = require('fs');

const resolvers = {
    Query: {
        uploads: () => {
            // Return the record of files uploaded from your DB or API or filesystem.
        }
    }
}

module.exports = resolvers;