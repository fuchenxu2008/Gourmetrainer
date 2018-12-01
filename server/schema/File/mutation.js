const resolvers = {
    Mutation: {
        singleUpload: async (parent, { file }) => {
            const { stream, filename, mimetype, encoding } = await file;
            console.log('file: ', file);

            // 1. Validate file metadata.

            // 2. Stream file contents into cloud storage:
            // https://nodejs.org/api/stream.html

            // 3. Record the file upload in your DB.
            // const id = await recordFile( … )

            return { filename, mimetype, encoding };
        }
    }
}

module.exports = resolvers;